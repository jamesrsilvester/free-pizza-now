console.log("JS is Linked");

$(document).ready(function() {

  //renderEvents(sampleEvents);
  let eventAddForm = $('#eventAddForm');
  let closeModal = $('#closeModal');
  let currPage = 'Home';
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
  // Add Event Button Clicked
  $('#eventAdd').on('click', function(e) {
      $('#eventsModal').modal();
    });

  $('#navEventBrite').on('click', function(e) {
    event.preventDefault();
    getEventBriteEvents();
  });
  //Save New Event
  eventAddForm.on('submit', function(e) {
    e.preventDefault();
    let formData = $(this).serialize();
    //POST to node
    $.post('/api/events', formData, function(event) {
      console.log(event);
      renderEvent(event);  //render the server's response
      resetEventForm();
    });
  });

  $('#contentContainer').on('click', '.edit-event', function(e){

    e.preventDefault();

    let id= $(this).closest('.event').data('event-id'),
    selectorId = `#${id}`,
    selectorIdEventData = `${selectorId} .eventData`,
    selectorIdEventInput = `${selectorId} .eventInput`,
    selectorIdSaveEvent = `${selectorId} .save-event`,
    selectorIdEditEvent = `${selectorId} .edit-event`;

    $(selectorIdEventInput).css("display","inline-block");
    $(selectorIdEventData).css("display","none");
    $(selectorIdSaveEvent).css("display","inline-block");
    $(selectorIdEditEvent).css("display","none");
  });

  $('#contentContainer').on('click', '.del-event', function(e){
      e.preventDefault();
      let id= $(this).closest('.event').data('event-id');
      handleDeleteEventClick(id);
  });

  $('#contentContainer').on('click', '.save-event', function(e) {
    let id= $(this).closest('.event').data('event-id');
    let formIdSelector = `#${id}-update`;
    let data = $(formIdSelector).serialize();

    $.ajax({
      method: 'PUT',
      url: `/api/events/${id}`,
      data: data,
      success: updateEventSuccess,
      error: handleError
    });
  });

  $("#closeModal").on("click", function(e){
    //no prevent default - want to keep
    //default form reset behavior w/o passing form ID
    $("#eventsModal").modal('hide');
  });
});
  // $("#addEvent").on("click")

function loadHome(){

  let pageHeaderContent = `Events`;
  $("#pageHeader").empty().html(pageHeaderContent);

  //all events
  let contentHeaderContent = `<button id="eventAdd" class="btn btn-warning">Add Event</button>`;
  $("#contentHeader").empty().html(contentHeaderContent);

  $.ajax({
    method: 'GET',
    url: '/api/events',
    success: handleSuccessGet,
    error: handleError
  });
}

function loadAbout(){
  let pageHeaderContent = `About`;
  $("#pageHeader").empty().html(pageHeaderContent);

  $("#contentHeader").empty();


  let contentContainerContent = `
  <h5>The Free Pizza Now Story</h5>
  <h4><strong>Free Pizza Now</strong> is the brainchild of one <span style="font-size: 18px;">Mr. James Silvester</span>,
  a man with an unquenchable desire for 3 things: <span style="font-weight: bold; color: red;">Free stuff, Pizza, and Immediacy</span>.</h4>
  <img src="images/james.jpg" class="aboutImage pull-right">
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
  </blockquote>
  <p>While we would love to tell you that our brilliant and inspirational founder, James (AKA JayBird) Silvester, was able to somehow
  manufacture free pizza from thin air, the truth is it took many many months of tireless labor, daring risks, and hungry late nights
  in front of his Macbook developing what we all now know as 2017's Killer App. James, of course, made  asuccessful exit from Free
  Pizza Now, his vision, drive, and yes, his hunger, finally paying off to the tune of $10 billion dollars when Free Pizza Now was
  bought by a joint conglomerate of United Nations Member Nations. The company and the app are now well on their way to solving world
  hunger by connecting famine and poverty stricken populations across the world with FREE PIZZA.........NOW!!!!!!
  `;
  $("#contentContainer").empty().html(contentContainerContent);

}

function loadSignUp(){
  $("#contentHeader").empty();

  let pageHeaderContent = `Sign Up for FREE PIZZA!!!!!`;
  $("#pageHeader").empty().html(pageHeaderContent);
}
//
// });
function resetEventForm(){
  $("#closeModal").trigger("click");
}

function renderEvent(event) {
  console.log(event);
  let eventHtml = (`
    <div class="event col-md-4 col-xs-12 col-sm-6" id="${event._id}" data-event-id="${event._id}">
    <form id="${event._id}-update" action="#" onsubmit="return false" method="PUT"
      class="event-update-form" name="${event._id}-update">

        <div class="panel-default panel">
          <div class="panel-heading">
            <div class="panel-title">
              <span id="${event._id}-name" class='eventData'>${event.name}</span>
            </div>
          </div>
          <img src="${event.image}" id="${event._id}-image" alt="event image" class="eventImage img-fluid img-thumbail">
          <div class="eventContent">
            <div id="${event._id}-dateAndTime" class='eventData'><strong>${event.dateAndTime}</strong></div>
            <div id="${event._id}-venue" class='eventData'><strong><a href="#">${event.venue.name}</a></strong></div>
            <div id="${event._id}-address" class='eventData'>${event.venue.address}</div>
            <div id="${event._id}-desc" class='eventData'>${event.description}</div>
          </div>
        </div>
        <div class="panel panel-default">
          <div class="panel-body">
          <!-- begin event internal row -->
            <div class='row'>
              <div class="col-md-3 col-xs-6 thumbnail event-art">
                <span class="eventImage">
                  <img src="${event.image}" id="${event._id}-image" alt="event image" class="eventImage">
                </span>
              </div>
              <div class="col-md-9 col-xs-12">
                <ul class="list-group">
                  <li class="list-group-item">
                    <h4 class='inline-header'>Event Name:</h4>
                    <span id="${event._id}-name" class='eventData'>${event.name}</span>
                    <span id="${event._id}-name-input-span" class='eventInput'>
                      <input id="${event._id}-name-input" type="text" name="name" value="${event.name}" size="${event.name.length}" required>
                    </span>
                  </li>
                  <li class="list-group-item">
                    <h4 class='inline-header'>Date and Time:</h4>
                    <span id="${event._id}-dateAndTime" class='eventData'>${event.dateAndTime}</span>
                    <span id="${event._id}-dateAndTime-input-span" class='eventInput'>
                      <input id="${event._id}-dateAndTime-input" type="text" name="dateAndTime" size="${event.dateAndTime.length}" value="${event.dateAndTime}" required>
                    </span>
                  </li>
                  <li class="list-group-item">
                    <h4 class='inline-header'>Venue:</h4>
                    <span id="${event._id}-venue" class='eventData'>${event.venue.name}</span>
                    <span id="${event._id}-venue-input-span" class='eventInput'>
                      <input id="${event._id}-venue-input" type="text" name="venue"  size="${event.venue.name.length}" value="${event.venue.name}" required>
                    </span>
                  </li>

                  <li class="list-group-item">
                    <h4 class='inline-header'>Address:</h4>
                    <span id="${event._id}-address" class='eventData'>${event.venue.address}</span>
                    <span id="${event._id}-address-input-span" class='eventInput'>
                      <input id="${event._id}-address-input" type="text" name="address"  size="${event.venue.address.length}" value="${event.venue.address}" required>
                    </span>
                  </li>
                  <li class="list-group-item">
                    <h4 class='inline-header'>Description:</h4>
                    <span id="${event._id}-desc" class='eventData'>${event.description}</span>
                    <span id="${event._id}-desc-input-span" class='eventInput'>
                      <textarea id="${event._id}-desc-input" name="description" cols="40" rows="5" required>${event.description}</textarea>
                    </span>
                  </li>
                  <li class="list-group-item eventInput">
                    <h4 class='inline-header'>Image:</h4>
                    <span id="${event._id}-image-input-span" class='eventInput'>
                      <input id="${event._id}-image-input" type="text" name="image"  size="50" value="${event.image}" required>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <!-- end of event internal row -->
            <div class='row'>
              <div class='panel-footer'>
                <button class='btn btn-primary del-event pull-right'>Delete Event</button>
                <button class='btn btn-primary edit-event pull-right'>Edit Event</button>
                <button class='btn btn-primary save-event pull-right'>Save Changes</button>
              </div>
            </div>
          </div>
        </div>

      </form>
    </div>

    <!-- end one event -->
  `);
  $('#contentContainer').append(eventHtml);
};

function renderEvents(eventsList){
  eventsList.forEach( function(item, index){
    renderEvent(item);
  });
}

function handleSuccessGet(eventsList){
  console.log(eventsList);
  renderEvents(eventsList);
}

function updateEventSuccess(event){

  let selectorId = `#${event._id}`,
  selectorIdEventInput = `${selectorId} .eventInput`,
  selectorIdEventData = `${selectorId} .eventData`,
  selectorIdSaveEvent = `${selectorId} .save-event`,
  selectorIdEditEvent = `${selectorId} .edit-event`,

  selectorEventName = `${selectorId}-name`,
  selectorDateAndTime = `${selectorId}-dateAndTime`,
  selectorVenue = `${selectorId}-venue`,

  selectorAddress = `${selectorId}-address`,
  selectorDesc = `${selectorId}-desc`,
  selectorImage = `${selectorId}-image`;

  selectorEventNameInput = `${selectorId}-name-input`,
  selectorDateAndTimeInput = `${selectorId}-dateAndTime-input`,
  selectorVenueInput = `${selectorId}-venue-input`,

  selectorAddressInput = `${selectorId}-address-input`,
  selectorDescInput = `${selectorId}-desc-input`,
  selectorImageInput = `${selectorId}-image-input`;

  eventName = $(selectorEventNameInput).val();
  $(selectorEventName).html(eventName);

  dateAndTime = $(selectorDateAndTime).val();
  $(selectorDateAndTime).html(dateAndTime);

  venue = $(selectorVenueInput).val();
  $(selectorVenue).html(venue);

  address = $(selectorAddressInput).val();
  $(selectorAddress).html(address);

  description = $(selectorDescInput).val();
  $(selectorDesc).html(description);

  image = $(selectorImageInput).val();
  $(selectorImage).attr('src',image);

  $(selectorIdEventInput).css("display","none");
  $(selectorIdEventData).css("display","inline");
  $(selectorIdSaveEvent).css("display","none");
  $(selectorIdEditEvent).css("display","inline");

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
let eventbriteAPI = "https://www.eventbriteapi.com/v3/events/search/?q=pizza+OR+refreshments&sort_by=distance&location.within=5mi&location.latitude=37.7902457&location.longitude=-122.40048120000002&price=free&start_date.keyword=today&token=QZAGTH35SAKMJ2DFF3DX"

function getEventBriteEvents(){
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
