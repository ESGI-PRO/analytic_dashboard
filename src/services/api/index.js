import { APIClient } from '../helpers/apiClient';

const client = new APIClient();



const  getAnalytics =   async (data) => {
    // set appId and apiKey
    localStorage.setItem("app", JSON.stringify(data));

    // Subscriptions
    const response = await client.post("/analytics/find_analytics_by_params", {
      ...data,
      data: {
        eventCategory: "Subscription",
      }
    });
    console.log("response", response)
    const subByCountry = response.data.reduce((prev, val) => {
      if (prev[val.data.events.country]) {
        prev[val.data.events.country] += 1;
      } else {
        prev[val.data.events.country] = 1;
      }
      return prev;
    }, {})

    // transform subByCountry to array of objects label value
    const subByCountryArray = Object.keys(subByCountry).map((key) => ({
        label: key,
        value: subByCountry[key]
      }))

    localStorage.setItem("subscription", JSON.stringify({
      subByCountryArray,
      count: response.data.length
    }));

    // Visits
    const response2 = await client.post("/analytics/find_analytics_by_params", {
      ...data,
      data: {
        eventCategory: "Visit",
      }});
    const visitByContinent = response2.data.reduce((prev, val) => {
      if (prev[val.data.events.continent]) {
        prev[val.data.events.continent] += 1;
      } else {
        prev[val.data.events.continent] = 1;
      }
      return prev;
    }, {})
    const visitByContinentArray = Object.keys(visitByContinent).map((key) => ({
        label: key,
        value: visitByContinent[key]
    }))

    const response3 = await client.post("/analytics/find_analytics_by_params", {
      ...data,
      data: {
        eventAction: "New Visit",
      }});

    // for visits count the number of eventAction for each date
    const visitByDate = response3.data.reduce((prev, val) => {
      if (prev[val.data.date]) {
        prev[val.data.date] += 1;
      } else {
        prev[val.data.date] = 1;
      }
      return prev;
    }, {})


    localStorage.setItem("visit", JSON.stringify({
      visitByContinentArray,
      count: response2.data.length,
      newVisitByDate: {
        dates: Object.keys(visitByDate),
        counts: Object.values(visitByDate),
        length: response3.data.length
      }
    }));

    // New Users
    const response4 = await client.post("/analytics/find_analytics_by_params", {
      ...data,
      data: {
        eventAction: "Login Account",
      }});
    localStorage.setItem("newUser", JSON.stringify({
      count: response4.data.length
    }));

    // Bug Reports
    const response5 = await client.post("/analytics/find_analytics_by_params", {
      ...data,
      data: {
        eventCategory: "Bug Reports",
      }});
    localStorage.setItem("bugReport", JSON.stringify({
      count: response5.data.length
    }));

    // Active Rooms
    const response6 = await client.post("/analytics/find_analytics_by_params", {
      ...data,
      data: {
        eventAction: "New Conversation",
      }});
    localStorage.setItem("activeRooms", JSON.stringify({
      count: response6.data.length
    }));

  }

 const  logout =  async () => {
    localStorage.removeItem("app");
  }

export { getAnalytics, logout };