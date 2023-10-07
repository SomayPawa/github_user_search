var username = "octocat";
fetch(`https://api.github.com/users/${username}`)
  .then((response) => response.json())
  .then((data) => generateProfile(data)); // fetches data from the github api of the user 'octocat'
  // 'octocat' is the  mascot of the github.
  // this line is executed at the start of the loading of the webpage. It'll execute only once

function generateProfile(profile) { // here 'profile' is the json object fetched using the api

  // selects various elements of the page from the DOM using query selector
  const pfp = document.querySelector("#pfp");
  const username = document.getElementById("username");
  const biod = document.querySelector("#bio");
  const rname = document.querySelector("#name");
  const joined = document.querySelector(".joined");
  const loc = document.querySelector(".location");
  const url = document.querySelector(".url");
  const twt = document.querySelector(".twitter");
  const org = document.querySelector(".org");
  const repos = document.querySelector(".repos");
  const followers = document.querySelector(".followers");
  const following = document.querySelector(".following");

  // the elements of the DOM are provided value using the json object which is provided as argument in the function
  pfp.src = profile.avatar_url;
  username.innerHTML = `@${profile.login}`;
  rname.innerHTML = profile.name;
  if (profile.bio == null) biod.textContent = "This profile has no bio"; // if the bio is null, the bio should return "This profile has no bio"
  else biod.textContent = profile.bio;
  joined.innerHTML = profile.created_at.slice(0, 10); // slized is used to just display the date and not the exact time which the user joined
  loc.textContent = profile.location;
  if (profile.blog == "") url.innerHTML = "Not available"; // if the user has not added any links in their profile
  else url.innerHTML = profile.blog;
  if (profile.twitter_username == null) twt.innerHTML = "Not available"; // if the user has not added their twitter
  else twt.innerHTML = profile.twitter_username;
  if (profile.company == null) org.innerHTML = "Not available";// if the user has not added their organisation
  else org.innerHTML = profile.company;
  repos.innerHTML = profile.public_repos;
  followers.innerHTML = profile.followers;
  following.innerHTML = profile.following;
}

// this function is again used in case the user searches another user
const fetchuser = async () => {
  const username = document.querySelector(".searchinput").value;
  const user = await fetch(`https://api.github.com/users/${username}`);
  const profile = await user.json();
  generateProfile(profile);
};
var n = 1;
function changetheme() {
  // used for changing the value of css variables when toggling the themes from dark to light and vice versa
  if (n % 2 == 1) {
    n++;
    document
      .querySelector(":root")
      .style.setProperty("--body-bg-color-dark", "#f6f8ff"); 
    document
      .querySelector(":root")
      .style.setProperty("--inner-bg-color-dark", "#fefefe");
    document
      .querySelector(":root")
      .style.setProperty("--logo-color-dark", "#222731");
    document
      .querySelector(":root")
      .style.setProperty("--secondry-text-color-dark", "#697c9a");
    document
      .querySelector(":root")
      .style.setProperty("--secondry-heading-color-dark", "#2b3442");
    document.querySelector(".modechange").src = "./images/icon-moon.svg";
    document.querySelector(".light").innerHTML = "DARK";
  } else {
    n++;
    document
      .querySelector(":root")
      .style.setProperty("--body-bg-color-dark", "#141d2f");
    document
      .querySelector(":root")
      .style.setProperty("--inner-bg-color-dark", "#1e2a47");
    document
      .querySelector(":root")
      .style.setProperty("--logo-color-dark", "#fff");
    document
      .querySelector(":root")
      .style.setProperty("--secondry-text-color-dark", "#fff");
    document
      .querySelector(":root")
      .style.setProperty("--secondry-heading-color-dark", "#fff");
    document.querySelector(".modechange").src = "./images/icon-sun.svg";
    document.querySelector(".light").innerHTML = "LIGHT";
  }
}
