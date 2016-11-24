import React from 'react';

export default function SettingsView (props) {
    function updateState(property) {
      return (event) => {
        props.updateState(property, event.target.value)
      }
    }

    return (
      <div className="settings">
        <form>
          <label>
            min length:
            <input value={props.minLength} onChange={updateState('minLength')}/>
          </label>
          <br/>
          <label>
            max length:
            <input value={props.maxLength} onChange={updateState('maxLength')}/>
          </label>
        </form>
      </div>
    );

}
