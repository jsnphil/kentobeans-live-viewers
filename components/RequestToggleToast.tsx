'use client';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

interface ToastProps {
  readonly show: boolean;
  readonly setShow: (show: boolean) => void;
}

function RequestToggleToast(props: ToastProps) {
  const { show, setShow } = props;
  return (

  );
}

export default RequestToggleToast;
