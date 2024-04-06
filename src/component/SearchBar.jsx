import React from 'react';
import Navbar from './Navbar';
function SearchPage() {
  return (<>
   <Navbar />
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="relative p-12 w-full sm:max-w-2xl sm:mx-auto pt-32">
        <div className="overflow-hidden z-0 rounded-full relative p-3">
          <form role="form" className="relative flex z-50 bg-white rounded-full">
            <input type="text" placeholder="enter your search here" className="rounded-full flex-1 px-6 py-4 text-gray-700 focus:outline-none" />
            <button className="bg-indigo-500 text-white rounded-full font-semibold px-8 py-4 hover:bg-indigo-400 focus:bg-indigo-600 focus:outline-none">Search</button>
          </form>
        </div>
      </div>
      <div className="flex justify-center">
       

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    name
                </th>
                <th scope="col" class="px-6 py-3">
                   user id
                </th>
                <th scope="col" class="px-6 py-3">
                    wallet address
                </th>
                
                <th scope="col" class="px-6 py-3">
                    status
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                   Manikandan
                </th>
                <td class="px-6 py-4">
                   goodboy
                </td>
                <td class="px-6 py-4">
                    d5g41t4g1g
                    g1g4fjougv5hj
                </td>
                
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">verified</a>
                </td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    Kuzhanthaivelu
                </th>
                <td class="px-6 py-4">
                    baby
                </td>
                <td class="px-6 py-4">
                    gghf855d85f8g5g855f2f5f5
                </td>
               
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">not verified</a>
                </td>
            </tr>
            <tr class="bg-white dark:bg-gray-800">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    Kiran
                </th>
                <td class="px-6 py-4">
                    kiran@123
                </td>
                <td class="px-6 py-4">
                    r555fmg755fmre55h5fr44df
                </td>
                
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Verified</a>
                </td>
            </tr>
        </tbody>
    </table>
</div>

      </div>
    </div>
    </>
  );
}

export default SearchPage;
