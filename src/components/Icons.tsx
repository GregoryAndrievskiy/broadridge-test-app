import React from 'react';

const PlusIcon = () => (
    <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
        <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    </svg>
);

const CloseIcon = () => (
    <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
        <path
            fill="currentColor"
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
        />
    </svg>
);

export { PlusIcon, CloseIcon };

