import React, { Component } from 'react';
import DragLoad from './components/dragload/drag.jsx';

export default class Demo extends Component {
    state = {
        data: [],
        limit: 15,
    }
    api = {
        baseUrl: 'https://cnodejs.org/api/v1/',
        home: 'topics',
    }

    componentWillMount() {
        this.refresh();
    }

    refresh() {
        return this.getData(1).then(rs => {
            this.setState({
                data: rs.data,
                page: 1
            })
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
            <div styleName="demo">
                <DragLoad
                    refresh={this.refresh.bind(this)}
                    loadNext={this.loadNext.bind(this)}
                >
                    <ul>
                        {data.map(d => (
                            <li key={`${d.id}${d.author_id}`}>{d.title}</li>
                        ))}
                    </ul>
                </DragLoad>
            </div>
        )
    }
}
