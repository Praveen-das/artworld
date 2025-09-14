import { Box, Modal, Slider } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import Cropper from 'cropperjs';

import "cropperjs/dist/cropper.css";
import './imageUploader.css'

export default function Editor({ open, ...props }) {
    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        // slotProps={{ backdrop: { style: { backgroundColor: 'white' } } }}
        >
            <div>
                <ImageEditor {...props}></ImageEditor>
            </div>
        </Modal >
    );
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // height: '90%',
    // aspectRatio: '1',
    // bgcolor: 'background.paper',
    // boxShadow: 20
};

function ImageEditor({ file, onClose, onSuccess, options = {} }) {
    const imageRef = useRef();
    const cropperRef = useRef();
    const [isLoading, setIsLoading] = useState(false)

    function RenderGranularRotate() {
        let preAngle = 0;
        return (
            <Slider
                onChange={(_, value) => {
                    cropperRef.current.rotateTo(value);
                    preAngle = value;
                }}
                min={-45}
                max={44}
                defaultValue={0}
                sx={{
                    width: 100,
                    mx: 1,
                    color: '#fff',
                    '.MuiSlider-rail': {
                        bgcolor: '#fff'
                    },
                    '.Mui-active': {
                        bgcolor: '#fff'
                    }
                }}
                aria-label="Volume"
                size='small' />
        );
    }
    function RenderRevert() {

        return (
            <button
                type="button"
                className="uppy-u-reset uppy-c-btn"
                data-microtip-position="top"
                onClick={() => {
                    cropperRef.current.reset();
                    cropperRef.current.setAspectRatio(0);
                }}
            >
                <svg aria-hidden="true" className="uppy-c-icon" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
                </svg>
            </button>
        );
    }
    function RenderRotate() {

        return (
            <button
                type="button"
                className="uppy-u-reset uppy-c-btn"
                onClick={() => cropperRef.current.rotate(-90)}
                data-microtip-position="top"
            >
                <svg aria-hidden="true" className="uppy-c-icon" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none" />
                    <path d="M14 10a2 2 0 012 2v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7a2 2 0 012-2h8zm0 1.75H6a.25.25 0 00-.243.193L5.75 12v7a.25.25 0 00.193.243L6 19.25h8a.25.25 0 00.243-.193L14.25 19v-7a.25.25 0 00-.193-.243L14 11.75zM12 .76V4c2.3 0 4.61.88 6.36 2.64a8.95 8.95 0 012.634 6.025L21 13a1 1 0 01-1.993.117L19 13h-.003a6.979 6.979 0 00-2.047-4.95 6.97 6.97 0 00-4.652-2.044L12 6v3.24L7.76 5 12 .76z" />
                </svg>
            </button>
        );
    }
    function RenderFlip() {

        return (
            <button
                type="button"
                className="uppy-u-reset uppy-c-btn"
                data-microtip-position="top"
                onClick={() => cropperRef.current.scaleX(-cropperRef.current.getData().scaleX || -1)}
            >
                <svg aria-hidden="true" className="uppy-c-icon" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M15 21h2v-2h-2v2zm4-12h2V7h-2v2zM3 5v14c0 1.1.9 2 2 2h4v-2H5V5h4V3H5c-1.1 0-2 .9-2 2zm16-2v2h2c0-1.1-.9-2-2-2zm-8 20h2V1h-2v22zm8-6h2v-2h-2v2zM15 5h2V3h-2v2zm4 8h2v-2h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2z" />
                </svg>
            </button>
        );
    }
    function RenderZoomIn() {

        return (
            <button
                type="button"
                className="uppy-u-reset uppy-c-btn"
                data-microtip-position="top"
                onClick={() => cropperRef.current.zoom(0.1)}
            >
                <svg aria-hidden="true" className="uppy-c-icon" height="24" viewBox="0 0 24 24" width="24">
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                    <path d="M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z" />
                </svg>
            </button>
        );
    }
    function RenderZoomOut() {
        return (
            <button
                type="button"
                className="uppy-u-reset uppy-c-btn"
                data-microtip-position="top"
                onClick={() => cropperRef.current.zoom(-0.1)}
            >
                <svg aria-hidden="true" className="uppy-c-icon" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z" />
                </svg>
            </button>
        );
    }
    function RenderCropSquare() {
        return (
            <button
                type="button"
                className="uppy-u-reset uppy-c-btn"
                data-microtip-position="top"
                onClick={() => cropperRef.current.setAspectRatio(1)}
            >
                <svg aria-hidden="true" className="uppy-c-icon" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
                </svg>
            </button>
        );
    }
    function RenderCloseButton() {
        return (
            <button
                type="button"
                className="uppy-u-reset uppy-c-btn"
                data-microtip-position="top"
                onClick={onClose}
            >
                <CloseIcon fontSize='small' />
            </button>
        );
    }
    function RenderSaveButton() {
        return (
            <button
                type="button"
                className="uppy-u-reset uppy-c-btn"
                data-microtip-position="top"
                onClick={getCropData}
            >
                <DoneIcon fontSize='small' />
            </button>
        );
    }

    const getCropData = () => {
        if (typeof cropperRef.current?.cropper !== "undefined") {
            const cropper = cropperRef.current;
            cropper.getCroppedCanvas().toBlob(blob => {
                const croppedFile = {
                    url: URL.createObjectURL(blob),
                    name: file.name,
                    uid: file.uid,
                    fileId: file.fileId,
                    // size: file.size,
                    // fileType: file.fileType
                };
                onSuccess(croppedFile);
            });
        }
    };

    useEffect(() => {
        setIsLoading(true)
        imageRef.current.onload = (e) => {
            setIsLoading(false)
            cropperRef.current = new Cropper(imageRef.current, {
                viewMode: 2,
                dragMode: 'move',
                background: false,
                center: true,
                ...options
            });
        }
        return () => cropperRef.current?.destroy();
    }, [options]);

    return (
        <Box sx={style}>
            <div style={{
                display: 'block',
                width: '100vw',
                height: '100vh'
            }}>
                <img
                    ref={imageRef}
                    style={{ display: 'none' }}
                    src={file instanceof File ? URL.createObjectURL(file) : file.url}
                    alt=""
                />
            </div>
            <div className="nav-controller_wrapper">
                <div className="uppy-ImageCropper-controls nav-controller">
                    <RenderCloseButton />
                </div>
                <div className="uppy-ImageCropper-controls nav-controller">
                    <RenderSaveButton />
                </div>
            </div>
            <div className="uppy-ImageCropper-controls">
                <RenderRevert />
                <RenderRotate />
                <RenderGranularRotate />
                <RenderFlip />
                <RenderZoomIn />
                <RenderZoomOut />
                <RenderCropSquare />
            </div>
        </Box>
    );
}
