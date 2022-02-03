import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    max-width: 80vw;
    border-radius: 1rem;
    background-color: white;
    border: '2px solid #000';
    padding: 1rem;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-direction: column;
`

const ModalCheckout = () => {
    return (
    <Div>
        <h2 style={{marginBottom: "10px"}} >
            Checkout feature still not implemented
        </h2>
        <p>thanks for trying out the app!</p>
    </Div>
    );
};

export default ModalCheckout;
