// pages/AdminBlockPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiArrowLeft, FiEdit, FiPlus, FiTrash2, FiRefreshCw } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

const AdminBlockPage = () => {
  const { blockId } = useParams();
  const navigate = useNavigate();
  const [block, setBlock] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showPlanForm, setShowPlanForm] = useState(false);
  const [showBlockForm, setShowBlockForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    const fetchBlock = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:8087/blocks/by-block-id/${blockId}`);
        setBlock(res.data);
        setError('');
      } catch (err) {
        setError("Block not found or server error.");
        toast.error("Failed to fetch block details");
      } finally {
        setLoading(false);
      }
    };

    fetchBlock();
  }, [blockId, refresh]);

  const handleDeleteBlock = async () => {
    try {
      await axios.delete(`http://localhost:8087/blocks/${blockId}`);
      toast.success("Block deleted successfully");
      navigate('/admin/blocks');
    } catch (err) {
      toast.error("Failed to delete block");
    }
  };

  const handleDeletePlan = async (planId) => {
    try {
      await axios.delete(`http://localhost:8087/plans/${planId}`);
      toast.success("Plan deleted successfully");
      setRefresh(!refresh);
    } catch (err) {
      toast.error("Failed to delete plan");
    }
  };

  const handleSlotClick = async (slotIndex) => {
    try {
      await axios.put(`http://localhost:8087/blocks/${blockId}/slots/${slotIndex}/toggle`);
      setRefresh(!refresh);
      toast.success("Slot status updated");
    } catch (err) {
      toast.error("Failed to update slot status");
    }
  };

  const handlePlanSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const planData = {
      name: formData.get('name'),
      priceMonthly: parseFloat(formData.get('priceMonthly')),
      priceYearly: parseFloat(formData.get('priceYearly'))
    };

    try {
      if (selectedPlan) {
        await axios.put(`http://localhost:8087/plans/${selectedPlan.id}`, planData);
        toast.success("Plan updated successfully");
      } else {
        await axios.post(`http://localhost:8087/blocks/${blockId}/plans`, planData);
        toast.success("Plan created successfully");
      }
      setRefresh(!refresh);
      setShowPlanForm(false);
      setSelectedPlan(null);
    } catch (err) {
      toast.error("Failed to save plan");
    }
  };

  const handleBlockUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const blockData = {
      name: formData.get('name'),
      blockId: formData.get('blockId'),
      rooms: parseInt(formData.get('rooms')),
      slots: Array(parseInt(formData.get('rooms'))).fill(false)
    };

    try {
      await axios.put(`http://localhost:8087/blocks/${blockId}`, blockData);
      toast.success("Block updated successfully");
      setRefresh(!refresh);
      setShowBlockForm(false);
    } catch (err) {
      toast.error("Failed to update block");
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
      <button 
        onClick={() => navigate('/admin/blocks')}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
      >
        <FiArrowLeft className="mr-2" /> Back to Blocks
      </button>
    </div>
  );

  return (
    <div className="max-w-4xl py-28 mx-auto p-6">
      {/* Action Buttons */}
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <FiArrowLeft className="mr-2" /> Back
        </button>
        <div className="flex space-x-2">
          <button 
            onClick={() => setRefresh(!refresh)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            <FiRefreshCw className="mr-2" /> Refresh
          </button>
          <button 
            onClick={() => setShowBlockForm(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            <FiEdit className="mr-2" /> Edit Block
          </button>
          <button 
            onClick={() => setShowDeleteConfirm(true)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            <FiTrash2 className="mr-2" /> Delete Block
          </button>
        </div>
      </div>

      {/* Block Info */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg mb-6">
        <h1 className="text-3xl font-bold mb-4 text-white">{block.name} ({block.blockId})</h1>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-300">Total Rooms</p>
            <p className="text-2xl font-bold text-white">{block.rooms}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-300">Occupied Slots</p>
            <p className="text-2xl font-bold text-white">
              {block.slots.filter(slot => slot).length} / {block.slots.length}
            </p>
          </div>
        </div>

        {/* Plans Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Plans</h2>
            <button 
              onClick={() => {
                setSelectedPlan(null);
                setShowPlanForm(true);
              }}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center"
            >
              <FiPlus className="mr-2" /> Add Plan
            </button>
          </div>
          
          {block.plans.length === 0 ? (
            <div className="bg-gray-700 p-4 rounded-lg text-center text-gray-300">
              No plans available for this block
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {block.plans.map(plan => (
                <div key={plan.id} className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                      <p className="text-gray-300">Monthly: ₹{plan.priceMonthly}</p>
                      <p className="text-gray-300">Yearly: ₹{plan.priceYearly}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => {
                          setSelectedPlan(plan);
                          setShowPlanForm(true);
                        }}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <FiEdit />
                      </button>
                      <button 
                        onClick={() => handleDeletePlan(plan.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Slots Section */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Slots</h2>
          <div className="flex items-center mb-4 space-x-4">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
              <span className="text-gray-300">Available</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-red-600 mr-2"></div>
              <span className="text-gray-300">Occupied</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {block.slots.map((slot, index) => (
              <button
                key={index}
                onClick={() => handleSlotClick(index)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${slot ? 'bg-red-600 hover:bg-red-700' : 'bg-green-500 hover:bg-green-600'}`}
                title={`Slot ${index + 1} - ${slot ? 'Occupied' : 'Available'}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-white mb-4">Delete Block</h2>
            <p className="text-gray-300 mb-6">Are you sure you want to delete {block.name}? This action cannot be undone.</p>
            
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleDeleteBlock();
                  setShowDeleteConfirm(false);
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Plan Form Modal */}
      {showPlanForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-white mb-4">
              {selectedPlan ? 'Edit Plan' : 'Add New Plan'}
            </h2>
            
            <form onSubmit={handlePlanSubmit}>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Plan Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={selectedPlan?.name || ''}
                  className="w-full bg-gray-700 text-white p-2 rounded"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-300 mb-2">Monthly Price (₹)</label>
                  <input
                    type="number"
                    name="priceMonthly"
                    step="0.01"
                    min="0"
                    defaultValue={selectedPlan?.priceMonthly || ''}
                    className="w-full bg-gray-700 text-white p-2 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Yearly Price (₹)</label>
                  <input
                    type="number"
                    name="priceYearly"
                    step="0.01"
                    min="0"
                    defaultValue={selectedPlan?.priceYearly || ''}
                    className="w-full bg-gray-700 text-white p-2 rounded"
                    required
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowPlanForm(false);
                    setSelectedPlan(null);
                  }}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                >
                  {selectedPlan ? 'Update Plan' : 'Add Plan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Block Form Modal */}
      {showBlockForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-white mb-4">Edit Block</h2>
            
            <form onSubmit={handleBlockUpdate}>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Block Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={block.name}
                  className="w-full bg-gray-700 text-white p-2 rounded"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Block ID</label>
                <input
                  type="text"
                  name="blockId"
                  defaultValue={block.blockId}
                  className="w-full bg-gray-700 text-white p-2 rounded"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Number of Rooms</label>
                <input
                  type="number"
                  name="rooms"
                  min="1"
                  defaultValue={block.rooms}
                  className="w-full bg-gray-700 text-white p-2 rounded"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowBlockForm(false)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                >
                  Update Block
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlockPage;