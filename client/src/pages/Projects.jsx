/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Datepicker, Label, Table } from "flowbite-react";
import { Alert, Modal, ModalBody, TextInput } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import Request from "./../../../api/models/requestModel";

export default function Projects() {
  const [request, setRequest] = useState([]);
  const [filteredRequest, setFilteredRequest] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const { travel__Id } = useSelector((state) => state.user);
  const [selectedTravelID, setSelectedTravelID] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [requestDeleted, setRequestDeleted] = useState(false);
  const [formData, setFormData] = useState({ trainNo: "", dt: "" }); // Initialize state properly
  const [selectedDate, setSelectedDate] = useState("");
  const [trainNo, settrainNo] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`/api/req/${currentUser._id}/allReq`);
        if (res.ok) {
          const data = await res.json();
          setRequest(data.requests);
          setFilteredRequest(data.requests); // Initially display all requests
          console.log(data.requests);
        }
      } catch (error) {
        console.log("Error:", error.message);
      }
    };
    getData();
  }, [currentUser, requestDeleted]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleDatepickerChange = (date) => {
    setSelectedDate(date);
    // Step 1: Format the date as "21-07-2024"
    const formattedDate = date
      ? date.toLocaleDateString("en-GB").split("/").join("-")
      : "";

    //console.log('Formatted Date:', formattedDate); // "21-07-2024"
    setFormData({ ...formData, dt: formattedDate });
  };

  const applyFilters = () => {
    const { trainNo, dt } = formData;
    console.log("train No: " + trainNo);
    console.log("Date: " + dt);
    const filtered = request.filter((req) => {
      const matchesTrainNo = trainNo ? req.trainNo.includes(trainNo) : true;
      const matchesDate = dt ? req.dt === dt : true;
      return matchesTrainNo && matchesDate;
    });
    setFilteredRequest(filtered);
    console.log(filtered);
    console.log("Filtered data: " + filtered);
  };

  const resetFilters = () => {
    setFormData({ trainNo: "", dt: "" });
    setSelectedDate("");
    setFilteredRequest(request); // Reset to show all requests
  };
  const handleOpenModal = (preferences) => {
    setSelectedPreferences(preferences);
    setOpenModal(true);
  };

  const handleDeletUser = async (travelID) => {
    console.log("Travel id inside");
    console.log(travelID);
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/req/delete/${currentUser._id}/${travelID}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.success) {
        console.log("Success");
        setRequestDeleted(!requestDeleted); // Toggle the requestDeleted state to trigger useEffect
      } else {
        console.log("ERROR");
      }
    } catch (error) {
      console.log("error");
    }
  };

  return request.length === 0 ? (
    <div className="tex mt-40 w-full mb-96 red-600 font-bold text-2xl">
      <p className="text-center font-serif text-9xl">😭</p>
      <p className="text-center font-serif "> 😒No Request found. 😢</p>
      <p className="text-center font-serif">
        😊Please wait for SOMEONE FOR THE REQUEST. 😊
      </p>
      <p className="mt-4 text-center font-serif">
        {" "}
        Thank you for your patience! 😊
      </p>
    </div>
  ) : (
    <>
      <div className=" p-20  min-h-screen">
        <div>
          <div className="mb-8">
            <h1 className="text-pretty text-2xl text-center font-semibold font-serif text-blue-800">
              All Request
            </h1>
            <hr className="text-indigo-500 divide-orange-400" />
            <hr />
            <hr />
            <hr />
          </div>
          <div className="mb-5">
            <h1 className="text-pretty text-2xl font-semibold font-serif text-red-600">
              Filter by
            </h1>
            <hr />
          </div>
          <form className="flex flex-col md:flex-row gap-4">
            <div>
              <Label value="Train No" />
              <TextInput
                type="text"
                placeholder="train no"
                id="trainNo"
                onChange={handleChange}
                value={formData.trainNo}
              />
            </div>
            <div>
              <Label value="Date" />
              <Datepicker
                id="datepicker"
                name="selectedDate"
                onChange={handleChange}
                value={selectedDate}
                onSelectedDateChanged={handleDatepickerChange}
              />
            </div>

            <Button
              className="w-40 h-8 md:mt-7"
              gradientDuoTone="purpleToPink"
              type="button"
              outline
              onClick={applyFilters}
            >
              Apply
            </Button>
            <Button
              className="w-40 h-8 md:mt-7"
              gradientDuoTone="purpleToBlue"
              type="button"
              outline
              onClick={resetFilters}
            >
              Reset
            </Button>
          </form>
        </div>
        <div className="table-  overflow-x-scroll scrollbar min-h-screen  scrollbar-track-slate-100 scrollbar-thumb-slate-500 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 ">
          <Modal
            dismissible
            show={openModal}
            onClose={() => setOpenModal(false)}
          >
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
                    <Table.Row
                      key={index}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell>{index + 1}</Table.Cell>
                      <Table.Cell>{pref.coach}</Table.Cell>
                      <Table.Cell>{pref.seatNo}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
              <p className="text-base leading-relaxed font-serif font-semibold dark:text-gray-400">
                <span className="text-3xl"> 🔁 </span> If you want to swap your
                seat with this person, follow the{" "}
                <span className="text-red-500">procedure</span> on the{" "}
                <span className="text-red-500">site</span>. 🚀
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => setOpenModal(false)}>Close</Button>
            </Modal.Footer>
          </Modal>
          <div className=" sm:flex flex-wrap gap-4 py-3  justify-center">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>User</Table.HeadCell>
                <Table.HeadCell>Train Name</Table.HeadCell>
                <Table.HeadCell>Boarding Station</Table.HeadCell>
                <Table.HeadCell>Destination Station</Table.HeadCell>
                <Table.HeadCell>Date</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>Preferences</Table.HeadCell>
                <Table.HeadCell>Delete Request</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {filteredRequest.map((req) => (
                  <Table.Row
                    key={req._id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell>{req.user.username}</Table.Cell>
                    <Table.Cell>
                      {req.trainID}-({req.trainNo})
                    </Table.Cell>
                    <Table.Cell>{req.boardingStation}</Table.Cell>
                    <Table.Cell>{req.destinationStation}</Table.Cell>
                    <Table.Cell>{req.dt}</Table.Cell>
                    <Table.Cell>
                      {req.isSwap ? "Swapped" : "Not Swapped"}
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        onClick={() => handleOpenModal(req.preferences)}
                        outline
                        className="w-full relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800 "
                      >
                        See Preferences
                      </Button>
                    </Table.Cell>
                    {req.user.username === currentUser.username && (
                      <Table.Cell>
                        <Button
                          onClick={() => {
                            setShowModal(true);
                            setSelectedTravelID(req.travelID);
                          }}
                          outline
                          className="w-full relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                        >
                          Delete Your Request
                        </Button>
                      </Table.Cell>
                    )}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
            <Modal
              show={showModal}
              onClose={() => setShowModal(false)}
              popup
              size="md"
            >
              <Modal.Header />
              <Modal.Body>
                <div className="text-center">
                  <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
                  <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete your account?
                  </h3>
                  <div className="flex justify-center gap-4">
                    <Button
                      color="failure"
                      onClick={() => handleDeletUser(selectedTravelID)}
                    >
                      Yes, I'm sure
                    </Button>
                    <Button color="gray" onClick={() => setShowModal(false)}>
                      No, cancel
                    </Button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}
