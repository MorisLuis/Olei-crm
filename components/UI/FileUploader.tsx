import React, { useState } from 'react';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';

const FileUploader: React.FC = () => {
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const [fileType, setFileType] = useState<string | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setFileType(file?.type)
            setFilePreview(fileURL);
        }
    };

    return (
        <div className='input_uploader'>
            {
                !filePreview &&
                <label
                    htmlFor="file-upload"
                    className='input_loader'
                >
                    <FontAwesomeIcon icon={faCloudArrowUp} className={`icon cursor`} />
                    <p>Subir archivo</p>
                </label>
            }

            <input
                id="file-upload"
                type="file"
                accept="image/*,.pdf"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />

            {filePreview && (
                <div className='input_preview'>
                    {fileType?.endsWith('/pdf') ? (
                        <iframe src={filePreview} width="100%" title="PDF Viewer" className='input_frame'></iframe>
                    ) : (
                        <Image
                            src={filePreview}
                            alt={'preview'}
                            width={200}
                            height={200}
                            priority
                        />
                    )}

                    <label
                        htmlFor="file-upload"
                        className='input_loader_active'
                    >
                        <FontAwesomeIcon icon={faCloudArrowUp} className={`icon cursor`} />
                    </label>
                </div>
            )}
        </div>
    );
};

export default FileUploader;
