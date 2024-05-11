/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Accordion } from 'flowbite-react';

export default function Help() {
  return (
    <div className='mt-10 md:p-20 md:mx-40 min-h-screen'>
        <div className='w-full'>
      <Accordion collapseAll>
        <Accordion.Panel>
          <Accordion.Title>
            <span className="flex items-center">
              <span>How to Access the Seat Swapping Feature?</span>
              <span role="img" aria-label="key" className="ml-2" title="Important">
                🔑
              </span>
            </span>
          </Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              To access the seat swapping feature, follow these steps:
            </p>
            <ol className="list-decimal pl-5 mb-2 text-gray-500 dark:text-gray-400">
              <li>Create an account and log in to the railway public services platform.</li>
              <li>Enter your PNR number to retrieve information related to your reservation.</li>
              <li>Select your preferences for swapping coach and position.</li>
              <li>Click on the "Ask for Swap" button to submit your request.</li>
              <li>You will be redirected to a page displaying all users seeking swaps.</li>
              <li>If your request doesn't find a match, it will be listed in the "All Requests" section.</li>
            </ol>
            <p className="text-gray-500 dark:text-gray-400">For further assistance, refer to the <a href="/help/swapping-feature" className="text-blue-600 dark:text-blue-500 hover:underline">Swapping Feature Guide</a>.</p>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>
            <span className="flex items-center">
              <span>Privacy Concerns and Data Security</span>
              <span role="img" aria-label="lock" className="ml-2" title="Important">
                🔒
              </span>
            </span>
          </Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-500 dark:text-gray-400">We take your privacy and data security seriously. Here's how we address your concerns:</p>
            <ul className="list-disc pl-5 mb-2 text-gray-500 dark:text-gray-400">
              <li>Your personal information is securely stored and encrypted to prevent unauthorized access.</li>
              <li>We do not share your data with third parties without your consent, except as required by law.</li>
              <li>We adhere to industry-standard security practices to safeguard your information from breaches or cyber threats.</li>
              <li>You have control over your data and can update or delete it at any time through your account settings.</li>
            </ul>
            <p className="text-gray-500 dark:text-gray-400">For more information, please review our <a href="/privacy-policy" className="text-blue-600 dark:text-blue-500 hover:underline">Privacy Policy</a>.</p>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>
            <span className="flex items-center">
              <span>General Questions</span>
              <span role="img" aria-label="question" className="ml-2" title="Important">
                ❓
              </span>
            </span>
          </Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-500 dark:text-gray-400"><strong>Q: How can I reset my password?</strong></p>
            <p className="mb-2 text-gray-500 dark:text-gray-400">A: You can reset your password by visiting the login page and clicking on the "Forgot Password" link. Follow the instructions provided to reset your password.</p>
            <p className="mb-2 text-gray-500 dark:text-gray-400"><strong>Q: How can I update my details?</strong></p>
            <p className="mb-2 text-gray-500 dark:text-gray-400">A: You can update your details by visiting the profile section of your account. Navigate to the profile settings where you can edit your personal information such as name, email, and contact details.</p>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
      </div>
    </div>
  );
}
