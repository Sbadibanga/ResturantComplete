import { getCartItems } from './localStorage';
// to get the url of the spefic route, returns object 
export const parseRequestURL = () => {
    const url = document.location.hash.toLowerCase();
    const request = url.split('/');
    return {
      resource: request[1],
      id: request[2],
      action: request[3],
    };
};
// function to rerender a screen
export const rerender = async(component) =>{
    document.getElementById('main-container').innerHTML = await component.render();
    await component.after_render();
}
// function to show loadinig
export const showLoading = () => {
  document.getElementById('loading-overlay').classList.add('active');
};
// function to hide loadinig
export const hideLoading = () => {
  document.getElementById('loading-overlay').classList.remove('active');
};
// function to show a message
export const showMessage = (message, callback) => {
  document.getElementById('message-overlay').innerHTML = `
  <div>
    <div id="message-overlay-content">${message}</div>
    <button id="message-overlay-close-button" class="btn btn-default">OK</button>
  </div>
  `;
  document.getElementById('message-overlay').classList.add('active');
  document
  .getElementById('message-overlay-close-button')
    .addEventListener('click', () => {
      document.getElementById('message-overlay').classList.remove('active');
      if (callback) {
          callback();
        }
      });
};
// function to redirect the customer to shipping if their cart doesnt equal zero or redirect to home page
export const redirectCustomer = () =>{
  if(getCartItems().length !== 0){
    document.location.hash = '/shipping';
  } else{
    document.location.hash = '/';
  }
}