import React from 'react';

const NasaLogo: React.FC = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 261 211"
            className="w-20 h-auto mx-auto mb-4"
            aria-label="NASA Logo"
        >
            <circle cx="130.5" cy="105.5" r="105.5" fill="#0B3D91" />
            <g clipPath="url(#clip0_nasa_logo)">
                <path
                    d="M174.5 106.5c0 23.858-19.642 43.5-43.5 43.5S87.5 130.358 87.5 106.5 107.142 63 131 63s43.5 19.642 43.5 43.5z"
                    fill="#fff"
                />
                <path
                    d="M129.5 186.5c29.056 0 53.679-13.436 70.5-34l-19-119.5-51 15.5-42.5-15.5-27 119.5c16.821 20.564 41.444 34 68.5 34z"
                    fill="#fff"
                />
                <path d="M41 97s32 21 61-20" stroke="#FC3D21" strokeWidth="12" />
                <path d="M211 101s-32 21-61-20" stroke="#FC3D21" strokeWidth="12" />
                {/* Stars */}
                <circle cx="25.8" cy="60.7" r="3" fill="#fff" />
                <circle cx="37.4" cy="33.1" r="2" fill="#fff" />
                <circle cx="70" cy="20" r="2.5" fill="#fff" />
                <circle cx="100" cy="25" r="1.5" fill="#fff" />
                <circle cx="150" cy="15" r="2" fill="#fff" />
                <circle cx="200" cy="40" r="3" fill="#fff" />
                <circle cx="230" cy="80" r="2" fill="#fff" />
                <circle cx="240" cy="120" r="2.5" fill="#fff" />
                <circle cx="199.3" cy="180.1" r="3" fill="#fff" />
                <circle cx="220.1" cy="163.2" r="2" fill="#fff" />
            </g>
            <defs>
                <clipPath id="clip0_nasa_logo">
                    <circle cx="130.5" cy="105.5" r="105.5" fill="#fff" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default NasaLogo;
