import React from 'react';

class Layout extends React.Component {
  render () {
    return (
      <main className="Content">
        <div style={{margin: '20px'}}>
          {this.props.children}
        </div>
      </main>
    );
  };
}

export default Layout;