import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Abi from "../abi/abi.json";
import nftContractABI from '../abi/nftabi.json'
import { ethers } from "ethers";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            const myContractAddress = "0xA50e1985D9790F5C6Bae73e327Bcf2B2148a93F4";
            const contract = new ethers.Contract(
              myContractAddress,
              Abi,
              signer
            );
            console.log(contract);
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
                    console.log("KYC Data:", allKYCData);
                } catch (error) {
                    console.error('Error fetching KYC data:', error);
                    toast.warning('Error fetching KYC data:', error)
                }
            }
        }
        fetchData();
    }, [contract]);

    const generateUserAddress = (userId) => {
        const address = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(userId));
        return address;
    };

    const handleSearch = async () => {
        const user = kycData.find(data => data.userId === searchedUserId);
        if (user) {
            const userAddress = generateUserAddress(user.userId);
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const signerAddress = await signer.getAddress();
            
            if (signerAddress === address || signerAddress === userAddress) {
                try {
                    const nftContractAddress = "0x43B0F494f588A0CF8E122E75E6D75584aA27301b";
    
                    const nftContract = new ethers.Contract(nftContractAddress, nftContractABI, signer);

                    const tokenURI = `https://ipfs.io/ipfs/${user.transactionAddress}`;
                    const tokenId = await nftContract.proof(address, tokenURI, user.userId, user.name, user.transactionAddress);
                    toast.success(`NFT minted successfully for user ${user.userId} as proof of work.`);
                    
                    const tokenMetadata = await nftContract.getNFTMetadata(tokenId);
                    setSearchResult({ userId: tokenMetadata.userId, userName: tokenMetadata.userName, userAddress: tokenMetadata.userAddress, verified: true });
                } catch (error) {
                    console.error('Error minting NFT:', error);
                    toast.error('Error minting NFT:', error);
                }
            } else {
                toast.error('You are not authorized to mint an NFT for this user.');
            }
        }
    };
    
    
    
    
    

    const handleBack = () => {
        setSearchResult(null);
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex flex-col bg-gray-800">
                {searchResult ? (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
                        <div className="bg-white rounded-lg p-8">
                            <h2 className="text-xl font-semibold mb-4">User Details</h2>
                            <p><strong>User ID:</strong> {searchResult.userId}</p>
                            <p><strong>User Name:</strong> {searchResult.name}</p>
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
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                S.No
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                User ID
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                User Name
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Verified
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {kycData.map((data, index) => (
                                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <td className="px-6 py-4">{index + 1}</td>
                                                <td className="px-6 py-4">{data.userId}</td>
                                                <td className="px-6 py-4">{data.name}</td>
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
            <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    theme="colored" />
        </>
    );
}

export default SearchPage;
