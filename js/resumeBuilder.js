/*
This is empty on purpose! Your code to build the resume will go here.
 */

( function(){

  var model = {

    bio: {
      name: "Leonard G.",
      role: "Front-end Developer",
      contacts: {
        mobile: "13145957822",
        email: "gw980531@gmail.com",
        github: "https://github.com/524119574/",
        location: "Shenzhen, Guangdong Province, China"
      },
      welcomeMessage: "Hello~ Welcome to my personal resume site~",
      skills: ["HTML5", "CSS3", "JavaScript", "JQuery", "Bootstrap", "VUE", "Page Speed Optimization"],
      biopic: "images/photo.jpg",
      display: function(){
        view.showBioHtml();
      }
    },

    education: {
      schools: [{
        name: "Shenzhen College of International Education",
        location: "Shenzhen, China",
        degree: "High School",
        majors: ["Maths", "Physics", "Chemistry"],
        dates: "2014-2016",
      }],
      onlineCourses: [{
        title: "Udacity Front-end Nano Degree",
        school: "Udacity",
        dates: "2017-present",
        url: "https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001"
      }],
      display:function(){
        view.showEducationHtml();
      }
    },

    work: {
      jobs: [{
        employer: "Google Inc.",
        title: "Intern",
        location: "Mountain View California",
        dates: "in progress",
        description: "This is a fake description, but I will try to turn it into reality.",
      }],
      display: function(){
        view.showWorkHtml();
      }
    },

    projects:{
      projects: [{
        title: "Classic Game Clone",
        dates: "April 2017",
        description: "Clone of the classic game, Frogger",
        images: ["images/game.png"]
      }],
      display: function(){
        view.showProjectsHtml();
      }
    }


  };

  var octopus = {
    init: function(){
      model.bio.display();
      model.work.display();
      model.projects.display();
      model.education.display();
      octopus.appendMap();
    },
    updateBioHtml: function(){
      HTMLheaderName = HTMLheaderName.replace("%data%", model.bio.name);
      HTMLheaderRole = HTMLheaderRole.replace("%data%", model.bio.role);

      HTMLmobile = HTMLmobile.replace("%data%", model.bio.contacts.mobile);
      HTMLemail = HTMLemail.replace("%data%", model.bio.contacts.email);
      HTMLgithub = HTMLgithub.replace("%data%", model.bio.contacts.github);
      HTMLlocation = HTMLlocation.replace("%data%", model.bio.contacts.location);
      HTMLwelcomeMsg = HTMLwelcomeMsg.replace("%data%", model.bio.welcomeMessage);
      HTMLbioPic = HTMLbioPic.replace("%data%", model.bio.biopic);

      // create an array to store the skill data html
      var skillArr = [];
      for (var i = 0; i < model.bio.skills.length; i++){
        var skill = HTMLskills.replace("%data%", model.bio.skills[i]);
        skillArr.push(skill);
      }
      return skillArr;
    },
    updateEducationHtml: function(){
      // create an array to store the school data
      var schoolArr = [];
      for (var i = 0; i < model.education.schools.length; i++){
        // create an array to store the list of major
        var majorsHtmlArr = [];
        for (var c = 0; c < model.education.schools[i].majors.length; c++){
          majorsHtmlArr.push(HTMLschoolMajor.replace("%data%", model.education.schools[i].majors[c]));
        }
        schoolArr.push({
          nameHtml: HTMLschoolName.replace("%data%", model.education.schools[i].name),
          locationHtml: HTMLschoolLocation.replace("%data%", model.education.schools[i].location),
          degreeHtml: HTMLschoolDegree.replace("%data%", model.education.schools[i].degree),
          majorsHtml: majorsHtmlArr,
          datesHtml: HTMLschoolDates.replace("%data%", model.education.schools[i].dates)
        });
      }

      var onlineArr = [];
      for (var m = 0; m < model.education.onlineCourses.length; m++){
        onlineArr.push({
          titleHtml: HTMLonlineTitle.replace("%data%", model.education.onlineCourses[m].title),
          schoolHtml: HTMLonlineSchool.replace("%data%", model.education.onlineCourses[m].school),
          datesHtml: HTMLonlineDates.replace("%data%", model.education.onlineCourses[m].dates),
          urlHtml: HTMLonlineURL.replace("%data%", model.education.onlineCourses[m].url),
        });
      }
      return {
        schoolArr: schoolArr,
        onlineArr: onlineArr
      };
    },
    updateWorkHtml: function(){
      var workArr = [];
      for (var i = 0; i < model.work.jobs.length; i++){
        workArr.push({
          employerHtml: HTMLworkEmployer.replace("%data%", model.work.jobs[i].employer),
          titleHtml: HTMLworkTitle.replace("%data%", model.work.jobs[i].title),
          locationHtml: HTMLworkLocation.replace("%data%", model.work.jobs[i].location),
          datesHtml: HTMLworkDates.replace("%data%", model.work.jobs[i].dates),
          descriptionHtml: HTMLworkDescription.replace("%data%", model.work.jobs[i].description)
        });
      }
      return workArr;
    },
    updateProjectsHtml: function(){
      var projectArr = [];
      for (var i = 0; i < model.projects.projects.length; i++){
        projectArr.push({
          titleHtml: HTMLprojectTitle.replace("%data%", model.projects.projects[i].title),
          datesHtml: HTMLprojectDates.replace("%data%", model.projects.projects[i].dates),
          descriptionHtml: HTMLprojectDescription.replace("%data%", model.projects.projects[i].description),
          imagesHtml: HTMLprojectImage.replace("%data%", model.projects.projects[i].images)
        });
      }
      return projectArr;
    },

    appendMap: function(){
      // Calls the initializeMap() function when the page loads
      window.addEventListener('load', octopus.initMap);

      // Vanilla JS way to listen for resizing of the window
      // and adjust map bounds
      window.addEventListener('resize', function(e) {
        //Make sure the map bounds get updated on page resize
        map.fitBounds(mapBounds);
      });

      $("#mapDiv").append(map);
    },

    initMap: function(){
      var locations;

      var mapOptions = {
        disableDefaultUI: true
      };

      /*
      For the map to be displayed, the googleMap var must be
      appended to #mapDiv in resumeBuilder.js.
      */
      map = new google.maps.Map(document.querySelector('#map'), mapOptions);


      /*
      locationFinder() returns an array of every location string from the JSONs
      written for bio, education, and work.
      */
      function locationFinder() {

        // initializes an empty array
        var locations = [];

        // adds the single location property from bio to the locations array
        locations.push(model.bio.contacts.location);

        // iterates through school locations and appends each location to
        // the locations array. Note that forEach is used for array iteration
        // as described in the Udacity FEND Style Guide:
        // https://udacity.github.io/frontend-nanodegree-styleguide/javascript.html#for-in-loop
        model.education.schools.forEach(function(school){
          locations.push(school.location);
        });

        // iterates through work locations and appends each location to
        // the locations array. Note that forEach is used for array iteration
        // as described in the Udacity FEND Style Guide:
        // https://udacity.github.io/frontend-nanodegree-styleguide/javascript.html#for-in-loop
        model.work.jobs.forEach(function(job){
          locations.push(job.location);
        });

        return locations;
      }

      /*
      createMapMarker(placeData) reads Google Places search results to create map pins.
      placeData is the object returned from search results containing information
      about a single location.
      */
      function createMapMarker(placeData) {

        // The next lines save location data from the search result object to local variables
        var lat = placeData.geometry.location.lat();  // latitude from the place service
        var lon = placeData.geometry.location.lng();  // longitude from the place service
        var name = placeData.formatted_address;   // name of the place from the place service
        var bounds = window.mapBounds;            // current boundaries of the map window

        // marker is an object with additional data about the pin for a single location
        var marker = new google.maps.Marker({
          map: map,
          position: placeData.geometry.location,
          title: name
        });

        // infoWindows are the little helper windows that open when you click
        // or hover over a pin on a map. They usually contain more information
        // about a location.
        var infoWindow = new google.maps.InfoWindow({
          content: name
        });

        // hmmmm, I wonder what this is about...
        google.maps.event.addListener(marker, 'click', function() {
          // your code goes here!
        });

        // this is where the pin actually gets added to the map.
        // bounds.extend() takes in a map location object
        bounds.extend(new google.maps.LatLng(lat, lon));
        // fit the map to the new marker
        map.fitBounds(bounds);
        // center the map
        map.setCenter(bounds.getCenter());
      }

      /*
      callback(results, status) makes sure the search returned results for a location.
      If so, it creates a new map marker for that location.
      */
      function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          createMapMarker(results[0]);
        }
      }

      /*
      pinPoster(locations) takes in the array of locations created by locationFinder()
      and fires off Google place searches for each location
      */
      function pinPoster(locations) {

        // creates a Google place search service object. PlacesService does the work of
        // actually searching for location data.
        var service = new google.maps.places.PlacesService(map);

        // Iterates through the array of locations, creates a search object for each location
          locations.forEach(function(place){
          // the search request object
          var request = {
            query: place
          };

          // Actually searches the Google Maps API for location data and runs the callback
          // function with the search results after each search.
          service.textSearch(request, callback);
        });
      }

      // Sets the boundaries of the map based on pin locations
      window.mapBounds = new google.maps.LatLngBounds();

      // locations is an array of location strings returned from locationFinder()
      locations = locationFinder();

      // pinPoster(locations) creates pins on the map for each location in
      // the locations array
      pinPoster(locations);


    }

  };

  var view = {
    showBioHtml: function(){
      var skillArr = octopus.updateBioHtml();
      $("#header").prepend(HTMLheaderRole);
      $("#header").prepend(HTMLheaderName);

      $("#topContacts").append(HTMLcontactGeneric);
      $("#topContacts").append(HTMLmobile);
      $("#topContacts").append(HTMLemail);
      $("#topContacts").append(HTMLgithub);
      $("#topContacts").append(HTMLlocation);

      $("#header").append(HTMLbioPic);
      $("#header").append(HTMLwelcomeMsg);

      $("#header").append(HTMLskillsStart);
      for (var i = 0; i < skillArr.length; i++){
        $("#skills").append(skillArr[i]);
      }
    },

    showEducationHtml: function(){
      var arr = octopus.updateEducationHtml();
      var schoolArr = arr.schoolArr;
      var onlineArr = arr.onlineArr;

      for (var i = 0; i < schoolArr.length; i++){
        $("#education").append(HTMLschoolStart);
        $(".education-entry:last").append(schoolArr[i].nameHtml+schoolArr[i].degreeHtml);
        $(".education-entry:last").append(schoolArr[i].datesHtml);
        $(".education-entry:last").append(schoolArr[i].locationHtml);
        // use a for loop to add majors
        for (var c = 0; c < schoolArr[i].majorsHtml.length; c++){
          $(".education-entry:last").append(schoolArr[i].majorsHtml[c]);
        }
      }

      for (i = 0; i < onlineArr.length; i++){
        $("#education").append(HTMLonlineClasses);
        $("#education").append(HTMLschoolStart);
        $(".education-entry:last").append(onlineArr[i].titleHtml+onlineArr[i].schoolHtml);
        $(".education-entry:last").append(onlineArr[i].datesHtml);
        $(".education-entry:last").append(onlineArr[i].urlHtml);
      }
    },
    showProjectsHtml: function(){
      var projectArr = octopus.updateProjectsHtml();
      for (var i = 0; i < projectArr.length; i++){
        $("#projects").append(HTMLprojectStart);
        $(".project-entry:last").append(projectArr[i].titleHtml);
        $(".project-entry:last").append(projectArr[i].datesHtml);
        $(".project-entry:last").append(projectArr[i].descriptionHtml);
        $(".project-entry:last").append(projectArr[i].imagesHtml);
      }
    },
    showWorkHtml: function(){
      var workArr = octopus.updateWorkHtml();
      for (var i = 0; i < workArr.length; i++){
        $("#workExperience").append(HTMLworkStart);
        $(".work-entry:last").append(workArr[i].employerHtml);
        $(".work-entry:last").append(workArr[i].titleHtml);
        $(".work-entry:last").append(workArr[i].locationHtml);
        $(".work-entry:last").append(workArr[i].datesHtml);
        $(".work-entry:last").append(workArr[i].descriptionHtml);
      }
    }
  };
  octopus.init();
}());
