import React from 'react';
import './Modal.css';

export default class Modal extends React.Component{

    // классический state в React, чтобы описать состояние окна Modal (по умолчанию закрыто)
    state = { 
        isOpen: false
    }




    render() {
        return (
            <React.Fragment>
                {/* кнопка "Open modal", по клику изменяет значение isOpen на true */}
                <button onClick = {() => this.setState({isOpen: true})}>Open modal</button>

                {/* Проверка условия */}
                {this.state.isOpen && ( 
                    <div className='modal'>
                        <div className='modal-body'>
                            <h1>Modal title</h1>
                            <p>I am awesome modal</p>
                             {/* кнопка "Close modal", по клику изменяет значение isOpen на false */}
                            <button onClick = {() => this.setState({isOpen: false})}>CLose modal</button>
                        </div>
                    </div>
                )}
            </React.Fragment>
        )
    }
}
