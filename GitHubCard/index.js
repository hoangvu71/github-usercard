/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
const followersArray =[];
const accordian = document.querySelector('.cards');

axios.get("https://api.github.com/users/hoangvu71").then((res) => {
  console.log(res);
    const user = res.data;
    const newCard = createFollowComponents(user);
    accordian.appendChild(newCard);
  })
  .catch((err) => {
    console.log('Error!')
  })


/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/


/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

function createFollowComponents(data) {
  ////////////////////////////
  // Create Elements
  const divCard = document.createElement('div');
  const imageUser = document.createElement('img');
  const cardInfo = document.createElement('div');
  const h3userName = document.createElement('h3');
  const pUserName = document.createElement('p');
  const pLocation = document.createElement('p');
  const pProfile = document.createElement('p');
  const linkGitHub = document.createElement('a');
  const pFollowers = document.createElement('p');
  const pFollowing = document.createElement('p');
  const pUserBio = document.createElement('p');

  ////////////////////////////
  // Create Path
  // All paths under divCard:
  divCard.appendChild(imageUser);
  divCard.appendChild(cardInfo);
  // All paths under cardInfo:
  cardInfo.appendChild(h3userName);
  cardInfo.appendChild(pUserName);
  cardInfo.appendChild(pLocation);
  cardInfo.appendChild(pProfile);
  cardInfo.appendChild(pFollowers);
  cardInfo.appendChild(pFollowing);
  cardInfo.appendChild(pUserBio);
  // All paths under pProfile:

  ////////////////////////////
  // Create Classnames
  divCard.classList.add("card");
  cardInfo.classList.add("card-info");
  h3userName.classList.add("name");
  pUserName.classList.add("username");

  ////////////////////////////
  // Create Textcontent
  imageUser.src = data.avatar_url;
  imageUser.alt = "Git Avatar";
  h3userName.textContent = data.name;
  pUserName.textContent = data.login;
  pLocation.textContent = `Location: ${data.location}`;
  pProfile.textContent = "Profile:";
  pProfile.appendChild(linkGitHub);
  linkGitHub.href = data.html_url;
  linkGitHub.textContent = data.html_url;
  pFollowers.textContent = `Followers: ${data.followers}`;
  pFollowing.textContent = `Following: ${data.following}`;
  pUserBio.textContent = data.bio;

  return divCard;
}



function createFollowers(){
  axios.get("https://api.github.com/users/hoangvu71/followers")
  .then((res) => {
    for (let i = 0; i < 5; i++){
      followersArray.push(res.data[i])
      function getFollowersLogin(login){
        axios.get(`https://api.github.com/users/${login}`)
        .then((res) => {
          accordian.appendChild(createFollowComponents(res.data));
        })
      }
      getFollowersLogin(res.data[i].login);
    }
  })
}

createFollowers();
console.log(followersArray);