// Import ethers library
import { ethers } from 'ethers';

// Function to check if user ID exists
async function userIdExists(contract, userId) {
    try {
        return await contract.userIdExists(userId);
    } catch (error) {
        console.error('Error checking if user ID exists:', error);
        throw error;
    }
}


// Function to get KYC data by signer address
async function getKYCDataBySigner(contract, signerAddress) {
    try {
        return await contract.getKYCDataBySigner(signerAddress);
    } catch (error) {
        console.error('Error getting KYC data by signer:', error);
        throw error;
    }
}

// Function to get address by user ID
async function getAddressByUserId(contract, userId) {
    try {
        return await contract.userIdToAddress(userId);
    } catch (error) {
        console.error('Error fetching address by user ID:', error);
        throw error;
    }
}

// Function to get all KYC data
async function getAllKYCData(contract) {
    try {
        return await contract.getAllKYCData();
    } catch (error) {
        console.error('Error fetching all KYC data:', error);
        throw error;
    }
}

export { userIdExists, getKYCDataBySigner, getAddressByUserId, getAllKYCData };
    
