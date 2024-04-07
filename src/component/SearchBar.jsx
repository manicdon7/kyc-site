// SearchPage.jsx

import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Abi from "../abi/abi.json";
import { ethers } from "ethers";

function SearchPage() {
    const [contract, setContract] = useState(null);
    const [kycData, setKYCData] = useState([]);
    const [address, setAddress]= useState([]);
    const [searchedUserId, setSearchedUserId] = useState('');
    const [searchResult, setSearchResult] = useState(null);

    useEffect(() => {
        async function initialize() {
          if (typeof window.ethereum !== "undefined") {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            setAddress(address);
            const myContractAddress = "0xA008C9f80F637E865B93554939d37FF69136A0E3";
            const contract = new ethers.Contract(
              myContractAddress,
              Abi,
              signer
            );
            setContract(contract);
          }
        }
        initialize();
      }, []);

    useEffect(() => {
        async function fetchData() {
            if (contract) {
                try {
                    const allKYCData = await contract.getAllKYCData();
                    setKYCData(allKYCData);
                } catch (error) {
                    console.error('Error fetching KYC data:', error);
                }
            }
        }
        fetchData();
    }, [contract]);

    const generateUserAddress = (userId) => {
        // Here you can implement your algorithm to generate the user's address based on their ID
        // For example, you can use a hash function like SHA-256 to generate a unique address
        const address = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(userId));
        return address;
    };

    const handleSearch = async () => {
        const user = kycData.find(data => data.userId === searchedUserId);
        if (user) {
            const userAddress = generateUserAddress(user.userId);
            setSearchResult({ userId: user.userId, userAddress, verified: user.verified });
        }
    };

    const handleBack = () => {
        setSearchResult(null);
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 flex flex-col">
                {searchResult ? (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
                        <div className="bg-white rounded-lg p-8">
                            <h2 className="text-xl font-semibold mb-4">User Details</h2>
                            <p><strong>User ID:</strong> {searchResult.userId}</p>
                            <p><strong>User Address:</strong> {searchResult.userAddress}</p>
                            <p><strong>KYC Status:</strong> {searchResult.verified ? 'Verified' : 'Not Verified'}</p>
                            <button onClick={handleBack} className="bg-indigo-500 text-white rounded-lg font-semibold px-6 py-2 mt-4 hover:bg-indigo-400 focus:bg-indigo-600 focus:outline-none">Back</button>
                        </div>
                    </div>
                ) : (
                    <div className="relative p-12 w-full sm:max-w-2xl sm:mx-auto pt-32">
                        <div className="overflow-hidden z-0 rounded-full relative p-3">
                            <form role="form" className="relative flex z-50 bg-white rounded-full">
                                <input type="text" placeholder="Enter user ID" value={searchedUserId} onChange={e => setSearchedUserId(e.target.value)} className="rounded-full flex-1 px-6 py-4 text-gray-700 focus:outline-none" />
                                <button type="button" onClick={handleSearch} className="bg-indigo-500 text-white rounded-full font-semibold px-8 py-4 hover:bg-indigo-400 focus:bg-indigo-600 focus:outline-none">Search</button>
                            </form>
                        </div>
                        <div className="flex justify-center">
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                User ID
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Verified
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {kycData.map((data, index) => (
                                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <td className="px-6 py-4">{data.userId}</td>
                                                <td className="px-6 py-4">{data.verified ? 'Verified' : 'Not Verified'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default SearchPage;
