import React, { useState, useEffect } from 'react';
import { MdEdit, MdDelete } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import Modal from '../components/Modal';
import { deleteStudent, getStudentInfo } from '../apis/dahboard.api';
import { toast } from 'react-toastify';
import PopUpModal from '../components/PopUpModal';
import { DataGrid } from '@mui/x-data-grid';

function Dashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpenPopUp, setIsOpenPopUp] = useState(false);
    const [data, setData] = useState([]);
    const [currentItem, setCurrentItem] = useState(null);

    const headers = ['Name', 'Subject', 'Mark', 'Status'];

    const openModal = (item = null) => {
        setCurrentItem(item);
        setIsModalOpen(true);
    };

    const openModalPopUp = (item = null) => {
        setCurrentItem(item);
        setIsOpenPopUp(true);
    };

    const closeModal = () => {
        setCurrentItem(null);
        setIsModalOpen(false);
    };

    const closeModalPopUp = () => {
        setCurrentItem(null);
        setIsOpenPopUp(false);
    };

    const fetchData = async () => {
        try {
            const response = await getStudentInfo();
            console.log('Fetched data:', response?.data?.data);
            const dataWithIds = response?.data?.data.map(item => ({
                id: item._id,
                ...item
            }));
            setData(dataWithIds);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const columns = [
        { field: 'name', headerName: 'Name', width: 250 },
        { field: 'subject', headerName: 'Subject', width: 250 },
        { field: 'mark', headerName: 'Mark', width: 250 },
        {
            field: 'actions',
            headerName: 'Action',
            width: 250,
            renderCell: (params) => (
                <div className="flex justify-start mt-2">
                    <button
                        onClick={() => openModal(params.row)}
                        className="border-2 border-green-500 rounded-md w-8 h-8 flex justify-center items-center bg-white mr-2"
                    >
                        <MdEdit className="text-sm text-green-500" />
                    </button>
                    <button
                        onClick={() => openModalPopUp(params.row)}
                        className="border-2 border-red-500 rounded-md w-8 h-8 flex justify-center items-center bg-white"
                    >
                        <MdDelete className="text-sm text-red-500" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col px-12">
            <div className="flex-grow flex flex-col mt-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-700">Student List</h2>
                    <button
                        onClick={() => openModal()}
                        className="border-2 border-red-500 font-semibold text-red-500 px-4 py-1 rounded-md flex items-center gap-2 hover:bg-red-600 hover:text-white"
                    >
                        <span>Add</span>
                        <IoMdAddCircleOutline className="text-sm" />
                    </button>
                </div>
                <div className="w-full max-w-screen-xl overflow-x-auto">
                    <DataGrid
                        key={data.length}
                        rows={data}
                        columns={columns}
                        getRowId={(row) => row._id}
                    />
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal} currentItem={currentItem} fetchData={fetchData} />
            <PopUpModal
                isOpen={isOpenPopUp}
                onClose={closeModalPopUp}
                currentItem={currentItem}
                fetchData={fetchData}
                // handleDelete={handleDelete}
            />
        </div>
    );
}

export default Dashboard;
