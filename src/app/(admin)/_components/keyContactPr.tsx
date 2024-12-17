"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import {
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaEnvelope,
} from "react-icons/fa";
import { MdDelete, MdUpdate } from "react-icons/md";

interface KeyContactPrProp {
  name: string;
  designation: string;
  linkedInLink: string | null;
  twitterLink: string | null;
  emailLink: string | null;
  facebookLink: string | null;
  onDelete: () => void;
  onUpdate: () => void;
  pic: string;
}

const KeyContactPr: React.FC<KeyContactPrProp> = ({
  name,
  designation,
  linkedInLink,
  twitterLink,
  emailLink,
  facebookLink,
  onDelete,
  onUpdate,
  pic,
}) => {
  return (
    <div className="border rounded-lg p-4 max-w-md bg-card text-card-foreground shadow-sm">
      <div className="text-center mb-4">
        <img
          src={pic}
          alt={`${name}'s profile`}
          className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
        />
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-gray-500">{designation}</p>
      </div>
      <div className="flex justify-center gap-4 mb-4">
        {linkedInLink ? (
          <a
            href={linkedInLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
          >
            <FaLinkedin size={24} />
          </a>
        ) : (
          <span className="text-gray-400 cursor-not-allowed">
            <FaLinkedin size={24} />
          </span>
        )}
        {twitterLink ? (
          <a
            href={twitterLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-600"
          >
            <FaTwitter size={24} />
          </a>
        ) : (
          <span className="text-gray-400 cursor-not-allowed">
            <FaTwitter size={24} />
          </span>
        )}
        {facebookLink ? (
          <a
            href={facebookLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-800 hover:text-blue-900"
          >
            <FaFacebook size={24} />
          </a>
        ) : (
          <span className="text-gray-400 cursor-not-allowed">
            <FaFacebook size={24} />
          </span>
        )}
        {emailLink ? (
          <a
            href={`mailto:${emailLink}`}
            className="text-red-500 hover:text-red-700"
          >
            <FaEnvelope size={24} />
          </a>
        ) : (
          <span className="text-gray-400 cursor-not-allowed">
            <FaEnvelope size={24} />
          </span>
        )}
      </div>
      <div className="flex space-x-3">
        <Button className="flex space-x-2" onClick={onUpdate} variant="outline">
          <span>Update</span>
          <MdUpdate className="w-6 h-6" />
        </Button>
        <Button className="flex space-x-2" onClick={onDelete} variant="ghost">
          <span>Delete</span>
          <MdDelete className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

export default KeyContactPr;
