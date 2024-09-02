import React, { useState, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import { toast } from 'react-toastify';
import { addStudent, editStudent } from '../apis/dahboard.api';

const Modal = ({ isOpen, onClose, currentItem, fetchData }) => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [name, setName] = useState('');
  const [mark, setMark] = useState('');

  const subjects = ['Math', 'Science', 'History', 'Geography', 'English'];

  useEffect(() => {
    if (currentItem) {
      setName(currentItem.name || '');
      setSelectedSubject(currentItem.subject || '');
      setMark(currentItem.mark || '');
    } else {
      setName('');
      setSelectedSubject('');
      setMark('');
    }
  }, [currentItem]);

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const subject = selectedSubject;

    if (!name || !subject || !mark) {
      toast.error('All fields are required.');
      return;
    }

    const data = { name, subject, mark };

    try {
      if (currentItem) {
        await editStudent(currentItem._id, data);
        toast.success('Student updated successfully');
        onClose()
        fetchData()
        setName('');
        setSelectedSubject('');
        setMark('');
      } else {
        await addStudent(data);
        toast.success('Student added successfully');
        onClose()
        fetchData()
        setName('');
        setSelectedSubject('');
        setMark('');
      }
    } catch (error) {
      console.error('Error handling form submission:', error);
      toast.error(error?.response?.data?.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-4 sm:mx-0">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">
            {currentItem ? 'Edit Student' : 'Add Student'}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <IoMdClose className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4">
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
              <select
                id="subject"
                value={selectedSubject}
                onChange={handleSubjectChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="" disabled>Select a subject</option>
                {subjects.map((subject, index) => (
                  <option key={index} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="mark" className="block text-sm font-medium text-gray-700">Mark</label>
              <input
                type="text"
                id="mark"
                value={mark}
                onChange={(e) => setMark(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex justify-end">
              <button type="button" onClick={onClose} className="border-2 border-red-500 text-red-500 px-4 py-2 rounded-md mr-2">Cancel</button>
              <button type="submit" onClick={handleSubmit} className="border-2 border-green-500 text-green-500 px-4 py-2 rounded-md">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
