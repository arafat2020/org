import { serverClient } from '@/app/_trpc/serverClient';
import { URLSet } from '@/app/_trpc/settings';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import React from 'react';
import { FaLinkedin, FaTwitter, FaEnvelope, FaFacebook } from 'react-icons/fa';

async function Speach({ params }: { params: { id: string } }) {
  const data = await serverClient.keyContact.getKeyContactById({ id: params.id });
  if (!data) return notFound();

  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 p-6 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden p-6">
        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <img
            src={`${URLSet.PROD}/${data.pic}`}
            alt={data.name}
            className="w-24 h-24 rounded-full shadow-lg object-cover mb-4"
          />
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            {data.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">{data.designation}</p>
        </div>

        {/* Links */}
        <div className="flex justify-center space-x-4 mt-4">
          {/* LinkedIn */}
          <a
            href={data.LinkedInLink || undefined}
            target="_blank"
            rel="noopener noreferrer"
            className={`${
              data.LinkedInLink ? 'text-blue-600 hover:text-blue-800' : 'text-gray-400 cursor-not-allowed'
            }`}
            aria-disabled={!data.LinkedInLink}
          >
            <FaLinkedin className="w-6 h-6" />
          </a>

          {/* Twitter */}
          <a
            href={data.twitterLink || undefined}
            target="_blank"
            rel="noopener noreferrer"
            className={`${
              data.twitterLink ? 'text-blue-400 hover:text-blue-600' : 'text-gray-400 cursor-not-allowed'
            }`}
            aria-disabled={!data.twitterLink}
          >
            <FaTwitter className="w-6 h-6" />
          </a>

          {/* Email */}
          <a
            href={data.emailLink ? `mailto:${data.emailLink}` : undefined}
            className={`${
              data.emailLink ? 'text-gray-600 hover:text-gray-800' : 'text-gray-400 cursor-not-allowed'
            }`}
            aria-disabled={!data.emailLink}
          >
            <FaEnvelope className="w-6 h-6" />
          </a>

          {/* Facebook */}
          <a
            href={data.faceBookLink || undefined}
            target="_blank"
            rel="noopener noreferrer"
            className={`${
              data.faceBookLink ? 'text-blue-700 hover:text-blue-900' : 'text-gray-400 cursor-not-allowed'
            }`}
            aria-disabled={!data.faceBookLink}
          >
            <FaFacebook className="w-6 h-6" />
          </a>
        </div>

        {/* Speech */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Speech</h3>
          {data.speach ? (
            <p className="text-gray-700 dark:text-gray-300 mb-6">{data.speach}</p>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 italic mb-6">No speech provided.</p>
          )}

          {/* Name and Designation */}
          <div className="border-t border-gray-300 dark:border-gray-700 pt-4 mt-4 text-right">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {data.name}
            </h4>
            <p className="text-gray-600 dark:text-gray-400">{data.designation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Speach;
