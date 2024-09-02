import React, { useState, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import { toast } from 'react-toastify';
import { addStudent, deleteStudent, editStudent } from '../apis/dahboard.api';

const PopUpModal = ({ isOpen, onClose, currentItem, fetchData }) => {

  const handleDelete = async () => {
    try {
        await deleteStudent(currentItem?._id);
        toast.success('Student deleted successfully');
        onClose();
        fetchData();
    } catch (error) {
        console.error('Error handling form submission:', error);
        toast.error('An error occurred while processing your request.');
    }
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-4 sm:mx-0">
        <div className="flex justify-between items-center p-4">
          <h3 className="text-lg font-semibold">
            {`Are you sure you want to delete ?` }
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <IoMdClose className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4">
            <div className="flex justify-end">
              <button type="button" onClick={onClose} className="border-2 border-red-500 text-red-500 px-4 py-2 rounded-md mr-2">Cancel</button>
              <button type="submit" onClick={handleDelete} className="border-2 border-green-500 text-green-500 px-4 py-2 rounded-md">Delete</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpModal;
