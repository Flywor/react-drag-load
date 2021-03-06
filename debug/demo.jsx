import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// import DragLoad from 'flywor-dragload';
// import 'flywor-dragload/index.css';

import DragLoad from '../publish/index';
import '../publish/index.css';

import './include/main.scss';

class Demo extends Component {
    state = {
        data: [],
        limit: 40,
    }
    api = {
        baseUrl: 'https://cnodejs.org/api/v1/',
        home: 'topics',
    }

    refresh() {
        return this.getData(1).then(rs => {
            this.setState({
                data: rs.data,
                page: 1
            });
        });
    }

    loadNext() {
        const { data, page } = this.state;
        return this.getData(page + 1).then(rs => {
            this.setState({
                data: [...data, ...rs.data],
                page: page + 1
            });
        });
    }

    getData(page) {
        const { limit } = this.state;
        const { baseUrl, home } = this.api;
        return fetch(`${baseUrl}${home}?page=${page}&limit=${limit}`, {
            method: 'get',
        }).then(response => response.json());
    }

    render() {
        const { data } = this.state;
        return (
            <div>
                <div style={{ fontSize: '14px' }}>
                    <DragLoad
                        height={`${window.screen.height}px`}
                        refresh={() => this.refresh()}
                        loadNext={() => this.loadNext()}
                        parentClass="test"
                    >
                        <ul>
                            {data.map(d => (
                                <li key={`${d.id}${d.author_id}`} style={{ padding: '8px' }}>{d.title}</li>
                            ))}
                        </ul>
                    </DragLoad>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Demo />, document.getElementById('root'));