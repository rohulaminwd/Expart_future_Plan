import React from "react";
import active from "../assets/icons/activeplan.png";

const SeeDetailsPlan = () => {
  return (
    <div>
      <input type="checkbox" id="see-details-plan" className="modal-toggle" />
      <div className="modal modal-middle">
        <div className="modal-box py-3 pt-4 sm:px-3 px-3 bg-white">
          <label
            htmlFor="see-details-plan"
            className="btn z-50 btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div>
            <h3 className="text-purple-700 text-xl font-bold">
              লাইফটাইম প্লান বিস্তারিত
            </h3>
            <p className="font-bold sm:text-[14px] mt-2">
              একাউন্ট এ যতো টাকা থাকবে তার উপরে ইনকাম হবে এবং লেভেল সিস্টেম
              রয়েছে
            </p>
            <div className="my-2">
              <p className="text-sm inline-block bg-[#f0eeee] rounded-md py-0.5 mb-1 px-1">
                লেভেল-১→১ হাজার থেকে ৩ হাজার টাকা। [৩.৫%]
              </p>
              <p className="text-sm inline-block bg-[#f0eeee] rounded-md py-0.5 mb-1 px-1">
                লেভেল-২→৩ হাজার থেকে ৬ হাজার টাকা। [৪%]
              </p>
              <p className="text-sm inline-block bg-[#f0eeee] rounded-md py-0.5 mb-1 px-1">
                লেভেল-৩→৬ হাজার থেকে ১২হাজার টাকা। [৪.৫]
              </p>
              <p className="text-sm inline-block bg-[#f0eeee] rounded-md py-0.5 mb-1 px-1">
                লেভেল-৪→১২হাজার থেকে Unlimited. [৫%]
              </p>
            </div>
            <div>
              <p className="text-[12px] mb-2">
                <span className="text-[14px] font-bold">লেভেল -১</span> এ ইনকাম
                হবে ৩.৫% যেমনঃ১০০০ টাকায় ৩৫ টাকা, ইনকাম প্রতিদিন বৃদ্ধি পেতে
                থাকবে।{" "}
              </p>
              <p className="text-[12px] mb-2">
                <span className="text-[14px] font-bold">লেভেল -২</span> এ ইনকাম
                হবে ৪% যেমনঃ ৩০০০ হাজার টাকায় ১২০ টাকা, একাউন্ট এর টাকার সাথে
                সাথে ইনকাম বৃদ্ধি পেতে থাকবে প্রতিদিন ।
              </p>
              <p className="text-[12px] mb-2">
                <span className="text-[14px] font-bold">লেভেল -৩</span> এ ইনকাম
                হবে ৪.৫% যেমনঃ ৬০০০ টাকায় ২৪০ টাকা, একাউন্ট এর টাকার সাথে সাথে
                ইনকাম ও বৃদ্ধি পেতে থাকবে প্রতিদিন ।
              </p>
              <p className="text-[12px] mb-2">
                <span className="text-[14px] font-bold">লেভেল -৪</span> এ ইনকাম
                হবে ৫% যেমনঃ১২০০০ টাকায় ৬০০ টাকা, একাউন্ট এর টাকার সাথে সাথে
                ইনকাম বৃদ্ধি পেতে থাকবে প্রতিদিন ।
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeeDetailsPlan;
