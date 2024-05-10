/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Table, Modal } from 'flowbite-react';

export default function Projects() {
   const [request, setRequest] = useState([]);
   const { currentUser } = useSelector((state) => state.user);
   const [openModal, setOpenModal] = useState(false);
   const [selectedPreferences, setSelectedPreferences] = useState([]);

   useEffect(() => {
      const getData = async () => {
         try {
            const res = await fetch(`/api/user/${currentUser._id}/getRequest`);
            if (res.ok) {
               const data = await res.json();
               setRequest(data.requests);
               console.log(data.requests);
            }
         } catch (error) {
            console.log("Error:", error.message);
         }
      };
      getData();
   }, [currentUser]);

   const handleOpenModal = (preferences) => {
      setSelectedPreferences(preferences);
      setOpenModal(true);
   };

   return (
      <div className='mt-10 mb-80'>
         <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>Preferences</Modal.Header>
            <Modal.Body>
               <Table hoverable>
                  <Table.Head>
                     <Table.HeadCell>Preference No.</Table.HeadCell>
                     <Table.HeadCell>Coach Position</Table.HeadCell>
                     <Table.HeadCell>Seat No</Table.HeadCell>
                  </Table.Head>
                  <Table.Body>
                     {selectedPreferences.map((pref, index) => (
                        <Table.Row key={index} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                           <Table.Cell>{index + 1}</Table.Cell>
                           <Table.Cell>{pref.coach}</Table.Cell>
                           <Table.Cell>{pref.seatNo}</Table.Cell>
                        </Table.Row>
                     ))}
                  </Table.Body>
               </Table>
               <p className="text-base leading-relaxed font-serif font-semibold dark:text-gray-400">
              <span className='text-3xl'> 🔁 </span> If you want to swap your seat with this person, follow the <span className="text-red-500">procedure</span> on the <span className="text-red-500">site</span>. 🚀
</p>

            </Modal.Body>
            <Modal.Footer>
               <Button onClick={() => setOpenModal(false)}>Close</Button>
            </Modal.Footer>
         </Modal>
         <div className='flex flex-wrap gap-4 py-3 mx-auto justify-center'>
            <Table hoverable>
               <Table.Head>
                  <Table.HeadCell>User</Table.HeadCell>
                  <Table.HeadCell>Train Name</Table.HeadCell>
                  <Table.HeadCell>Boarding Station</Table.HeadCell>
                  <Table.HeadCell>Destination Station</Table.HeadCell>
                  <Table.HeadCell>Date</Table.HeadCell>
                  <Table.HeadCell>Status</Table.HeadCell>
                  <Table.HeadCell>Preferences</Table.HeadCell>
               </Table.Head>
               <Table.Body>
                  {request.map((req) => (
                     <Table.Row key={req._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                        <Table.Cell>{req.name}</Table.Cell>
                        <Table.Cell>{req.trainID}</Table.Cell>
                        <Table.Cell>{req.boardingStation}</Table.Cell>
                        <Table.Cell>{req.destinationStation}</Table.Cell>
                        <Table.Cell>{req.dt}</Table.Cell>
                        <Table.Cell>{req.isSwap ? "Swapped" : "Not Swapped"}</Table.Cell>
                        <Table.Cell>
                           <Button onClick={() => handleOpenModal(req.preferences)} outline className="w-full relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800 ">See Preferences</Button>
                        </Table.Cell>
                     </Table.Row>
                  ))}
               </Table.Body>
            </Table>
         </div>
      </div>
   );
}
