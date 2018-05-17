# flywor-DragLoad

a react component supporting data list drag to load for React 16

## Install

```shell
npm install flywor-dragload
```

## Usage

```jsx
import DragLoad from 'flywor-dragload';
import 'flywor-dragload/index.css';
// ...
<DragLoad
  height // Content height
  refresh // callback function, must be return Promise
  loadNext // callback function, must be return Promise
  pullRate // the pulling speed determines the speed and distance of the upper and lower pulls. default value is 0.3
>
  {/* Content */}
</DragLoad>
// ...
```
