import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
      return (  
        <div>
          <table className="table table-bordered">
            <tbody>
            {
                Object.entries(this.props.emotions).map(([emotion, value]) => (
                    <tr>
                        <td>{emotion}</td>
                        <td>{value}</td>
                    </tr>
                ))
            }
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;
