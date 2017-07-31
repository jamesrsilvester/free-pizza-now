console.log("JS is Linked");

$(document).ready(function() {

  //renderEvents(sampleEvents);
  let modalEventForm = $('#modalEventForm');
  let closeModal = $('#closeModal');
  let currPage = 'Home';
  let numArticles = 0;
  loadHome();

  //nav
  $("#navHome").on("click", function(e){
    e.preventDefault();
    if (currPage !== 'Home'){
      currPage = 'Home';
      loadHome();
    }
  });

  $("#navAbout").on("click", function(e){
    e.preventDefault();
    if (currPage !== 'About'){
      currPage = 'About';
      loadAbout();
    }
  });

  $("#navSignUp").on("click", function(e){
    e.preventDefault();
    if (currPage !== 'SignUp'){
      currPage = 'SignUp';
      loadSignUp();
    }
  });
  // Add Event Button Clicked
  $('#eventAdd').on('click', function(e) {
      $("#saveEvent").html("Add Event");
      $("#modalH4").html("Create Event");
      $('#eventsModal').modal();
    });

  $('#navEventBrite').on('click', function(e) {
    event.preventDefault();
    getEventBriteEvents();
  });

  //Save New Event
  modalEventForm.on('submit', function(e) {
    e.preventDefault();

    let eventId = $("#modalEventId").val();
    let formData = $(this).serialize();
console.log($("#modalEventId").val());
    //put request if an id is present
    if (eventId){
      $.ajax({
        method: 'PUT',
        url: `/api/events/${eventId}`,
        data: formData,
        success: updateEventSuccess,
        error: handleError
      });
    } else {

      //POST to node
      $.post('/api/events', formData, function(event) {
        console.log(event);
        renderEvent(event);  //render the server's response
        resetEventForm();
      });
    }
  });

  $('#contentContainer').on('click', '.edit-event', function(e){
    e.preventDefault();

    let id= $(this).closest('.event').data('event-id'),
    selectorId = `#${id}`,
    selectorIdEventName = `${selectorId}-name`,
    selectorIdEventDateAndTime = `${selectorId}-dateAndTime`,
    selectorIdEventVenue = `${selectorId}-venue`,
    selectorIdEventAddress = `${selectorId}-address`,
    selectorIdEventDesc = `${selectorId}-desc`,
    selectorIdEventImage = `${selectorId}-image`

    $("#modalEventId").val(id);
    $("#modalEventForm input[name=name]").val($(selectorIdEventName).attr("data-select"));
    $("#description").val($(selectorIdEventDesc).html());
    $("#modalEventForm input[name=dateAndTime]").val($(selectorIdEventDateAndTime).attr("data-select"));
    $("#modalEventForm input[name=venue").val($(selectorIdEventVenue).attr("data-select"));
    $("#modalEventForm input[name=address]").val($(selectorIdEventAddress).attr("data-select"));
    $("#modalEventForm input[name=image]").val($(selectorIdEventImage).attr("src"));
    $("#saveEvent").html("Save Event");
    $("#modalH4").html("Edit Event");
    $('#eventsModal').modal();
  });

  $('#contentContainer').on('click', '.del-event', function(e){
      e.preventDefault();
      let id= $(this).closest('.event').data('event-id');
      handleDeleteEventClick(id);
  });

  // $('#contentContainer').on('click', '.save-event', function(e) {
  //   let id= $(this).closest('.event').data('event-id');
  //   let formIdSelector = `#${id}-update`;
  //   let data = $(formIdSelector).serialize();
  //
  //   $.ajax({
  //     method: 'PUT',
  //     url: `/api/events/${id}`,
  //     data: data,
  //     success: updateEventSuccess,
  //     error: handleError
  //   });
  // });

  $("#closeModal").on("click", function(e){
    //no prevent default - want to keep
    //default form reset behavior w/o passing form ID
    $("#eventsModal").modal('hide');
  });

});
  // $("#addEvent").on("click")

function loadHome(){

  let pageHeaderContent = `Events`;
  setPageHeader(pageHeaderContent);

  //all events
  let contentHeaderContent = `<button id="eventAdd" class="btn btn-primary">Add Event</button>`;
  setContentHeader(contentHeaderContent);

  $.ajax({
    method: 'GET',
    url: '/api/events',
    success: handleSuccessGet,
    error: handleError
  });
}

function loadAbout(){
  let pageHeaderContent = `About`;
  setPageHeader(pageHeaderContent);
  setContentHeader();

  let contentContainerContent = `
  <div class="col-xs-12 greyBack">
  <h3>The Free Pizza Now Story</h2>
  <p class="large"><strong>Free Pizza Now</strong> was the brainchild of one,
  a man with an unquenchable desire for 3 things: <span class="bigRed">Free stuff, Pizza, and Immediacy</span>.</p>
  <span class="imgCaption pull-right"><img src="../images/james.jpg" class="aboutImage"><br />Mr. James Silvester - Pizza Maven</span>
  <blockquote>
    I was sitting at my shared workspace table one day, overwhelmed by hunger. I couldn't concentrate. I felt dizzy.
    My vision blurred. I swore, as I tried to focus on the presentation, that I must be seeing things. (No one's beard
    could really be that long, could it?)

    I was young, overworked, unpaid, and tired of the free fruit and nutty granola bar snacks I was barely surviving on.
    I knew I didn't have any money (in fact I was paying to be there), but I simply couldn't deny it any more.
    My stomach craved something different, something better, but what could it be?

    Having not eaten a real meal in weeks I wasn't even sure what I liked anymore. I thought back to when life was simpler.
    Before things were so expensive. Before this grueling unrelenting pace of work, being forced to type my fingers to the bone
    in pursuit of the most-prized and elusive title, Full Stack Developer.

    I realized all my happy memories had one thing in common. I was well fed. There was food! And not just any food, PIZZA!
    My mouth began to water. FOOD! PIZZA! For the first time in weeks, I got excited. I realized something profound: I LOVED PIZZA!

    However, my excitement quickly waned with the realization that pizza costs money. And money was something I didn't have. Then it
    hit me, if there was anything I loved more than pizza, it was free pizza!

    What could I do? I had to come up with a plan. A plan for free pizza. And I was literally starving. so this had to happen fast.
    In that moment, my needs now clearly understood, it hit me: what I needed was: FREE PIZZA NOW!
    (Last Words Ever Spoken by James Silvester)
  </blockquote>
  <p class="large">While we would love to tell you that our brilliant and inspirational founder, James (AKA JayBird) Silvester, was able to somehow
  manufacture free pizza from thin air, the truth is it took many many months of tireless labor, daring risks, and hungry late nights
  in front of his Macbook developing what we all now know as 2017's Killer App. James, of course, made  a successful exit from Free
  Pizza Now, his vision, drive, and yes, his hunger, finally paying off to the tune of $10 billion dollars when Free Pizza Now was
  bought by a joint conglomerate of United Nations Member Nations. While James suffered a tragic, painful, and untimely death just one
  month after the company's purchase (an investigation is still on-going), the company and the app are now well on their way to solving world
  hunger by connecting famine and poverty stricken populations across the world with FREE PIZZA.........NOW!!!!!!</p>
  </div>`;

  setContent(contentContainerContent);

}

function loadSignUp(){
  let pageHeaderContent = `Sign Up for FREE PIZZA!!!!!`;
  setPageHeader(pageHeaderContent);
  setContentHeader();

  let contentContainerContent = `  <div class="col-md-4 greyBack">
  <span class="imgCaption"><img src="../images/reg_form.png"  class="regImage"></span></div>
<div class="col-md-4 greyBack"><span class="imgCaption"><img src="../images/IMG_3953.jpg" class="regImage"><br /> James Silvester & Some Random Dude</span>
  </div>`

  setContent(contentContainerContent);
}

function setPageHeader(pageHeaderContent){
  if (!pageHeaderContent){pageHeaderContent=""};
  $("#pageHeader").empty().html(pageHeaderContent);
}

function setContentHeader(contentHeaderContent){
  if (!contentHeaderContent){contentHeaderContent=""};
  $("#contentHeader").empty().html(contentHeaderContent);
}

function setContent(content){
  if (!content){content=""};
  $("#contentContainer").empty().html(content);
}

function appendContent(content){
  if (content){
    $("#contentContainer").append(content);
  }
}

function resetEventForm(){
  $("#closeModal").trigger("click");
}

function formatDateAndTime(dateAndTime){
  return `<strong>${dateAndTime}</strong>`;
}

function formatVenue(venue){
  return `<strong><a href="#">${venue}</a></strong>`;
}

function formatAddress(address){
  return `${address} <a href="#">(map)</a>`;
}

function formatName(name){
  let formattedName = name.substring(0,51);
  if (name.length > 50){
    formattedName = formattedName + '...';
  }
  return formattedName;
}

function renderEvent(event) {
  let formattedDateAndTime = formatDateAndTime(event.dateAndTime);
  let formattedVenue = formatVenue(event.venue.name);
  let formattedAddress = formatAddress(event.venue.address);
  let formattedName = formatName(event.name);
  let eventHtml =`<div class="event col-lg-4 col-md-4 col-xs-12 col-sm-6 " id="${event._id}" data-event-id="${event._id}">
      <div class="panel-default panel">
        <div class="panel-heading">
          <div class="panel-title">
            <span class="nameRevealWrap">
              <span  id="${event._id}-name" data-select="${event.name}" title="${event.name}" class="nameReveal">${event.name}</span>
            </span>
          </div>
        </div>
        <img src="${event.image}" id="${event._id}-image" alt="event image" class="eventImage img-fluid img-thumbail">
        <div class="eventContent">
          <div class="eventData bold">${event.name}</div>
          <div id="${event._id}-dateAndTime" data-select="${event.dateAndTime}" class='eventData'>${formattedDateAndTime}</div>
          <div id="${event._id}-venue" data-select="${event.venue.name}" class='eventData'>${formattedVenue}</div>
          <div id="${event._id}-address" data-select="${event.venue.address}" class='eventData'>${formattedAddress}</div>
          <div id="${event._id}-desc" class='eventData eventDesc'>${event.description}</div>
        </div>
        <div class='panel-footer'>
         <button class='btn btn-primary del-event pull-right'>Delete Event</button>
         <button class='btn btn-primary edit-event pull-right'>Edit Event</button>
        </div>
      </div>
    </div>

    <!-- end one event -->
  `;

  appendContent(eventHtml);
};

function renderEvents(eventsList){
  eventsList.forEach( function(item, index){
    renderEvent(item);
  });
}

function handleSuccessGet(eventsList){
  setContent();
  renderEvents(eventsList);

}

function updateEventSuccess(event){
  let selectorId = `#${event._id}`,
  selectorName = `${selectorId}-name`,
  selectorVenue = `${selectorId}-venue`,
  selectorAddress = `${selectorId}-address`,
  selectorDateAndTime = `${selectorId}-dateAndTime`,                  d
  selectorDesc = `${selectorId}-desc`,
  selectorImage = `${selectorId}-image`;

  $(selectorName).html(formatName(event.name));
  $(selectorName).attr("data-select",event.name);
  $(selectorVenue).html(formatVenue(event.venue.name));
  $(selectorVenue).attr("data-select",event.venue.name);
  $(selectorDateAndTime).html(formatDateAndTime(event.dateAndTime));
  $(selectorDateAndTime).attr("data-select",event.dateAndTime);
  $(selectorAddress).html(formatAddress(event.venue.address));
  $(selectorAddress).attr("data-select",event.venue.address);
  $(selectorDesc).html(event.description);
  $(selectorImage).attr("src",event.image);
  resetEventForm();
}

// DELETE EVENT
// when a delete button for an event is clicked
function handleDeleteEventClick(eventId) {
  console.log('someone wants to delete event id=' + eventId );
  $.ajax({
    url: '/api/events/' + eventId,
    method: 'DELETE',
    success: handleDeleteEventSuccess
  });
}

// callback after DELETE /api/events/:id
function handleDeleteEventSuccess(event) {
  console.log('removing the following event from the page:', event._id);
  let selectorID = `#${event._id}`;
  $(selectorID).remove();
}

function handleError(err){
  console.log(err);
}

// EVENTS
let eventbriteAPI = "https://www.eventbriteapi.com/v3/events/search/?q=pizza+OR+refreshments&sort_by=date&location.within=5mi&location.latitude=37.7902457&location.longitude=-122.40048120000002&price=free&start_date.keyword=this_week&token=QZAGTH35SAKMJ2DFF3DX";

function getEventBriteEvents(){
  let pageHeaderContent = `Import Events`;
  setPageHeader(pageHeaderContent);

  setContentHeader();

  $.ajax({
    method: "GET",
    url: eventbriteAPI,
    success: eventSuccess,
    error: handleError
  });
}

function eventSuccess(json) {
  console.log(json.events);
  //
  // data = $.param(json.events);
  // console.log(data);
  data = $.param(json);
  console.log(data);
  $.ajax({
    method: "POST",
    url: '/api/events/eventBrite',
    data: data,
    success: handleSuccessGet,
    error: handleError
  });
}
