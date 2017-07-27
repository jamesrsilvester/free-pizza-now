console.log("JS is Linked");

$(document).ready(function() {
  //all events
    $.ajax({
      method: 'GET',
      url: '/api/events',
      success: handleSuccessGet,
      error: handleError
    });

  //renderEvents(sampleEvents);

  let eventAddForm = $('#eventAddForm');
  let closeModal = $('#closeModal');
  // Add Event Button Clicked
  $('#eventAdd').on('click', function(e) {
      $('#eventsModal').modal();
    });

  //Save New Event
  eventAddForm.on('submit', function(e) {
    e.preventDefault();

    let formData = $(this).serialize();

    $.post('/api/events', formData, function(event) {
      console.log(event);
      renderEvent(event);  //render the server's response
      eventAddForm.reset();
    });
  });
});
  // $("#addEvent").on("click")

//
// });

function renderEvent(event) {

  let eventHtml = (`
    <div class="event" id="${event._id}" data-event-id="${event._id}">
    <form id="${event._id}-update" action="#" onsubmit="return false" method="PUT" class="event-update-form" name="${event._id}-update">
      <div class="col-md-10 col-md-offset-1">
        <div class="panel panel-default">
          <div class="panel-body">
          <!-- begin event internal row -->
            <div class='row'>
              <div class="col-md-3 col-xs-12 thumbnail event-art">
                <img src="images/events/${event.image}" alt="event image">
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
                    <span id="${event._id}-venue" class='eventData'>${event.venue}</span>
                    <span id="${event._id}-venue-input-span" class='eventInput'>
                      <input id="${event._id}-venue-input" type="text" name="venue"  size="${event.venue.length}" value="${event.venue}" required>
                    </span>
                  </li>

                  <li class="list-group-item">
                    <h4 class='inline-header'>Address:</h4>
                    <span id="${event._id}-address" class='eventData'>${event.address}</span>
                    <span id="${event._id}-address-input-span" class='eventInput'>
                      <input id="${event._id}-address-input" type="text" name="address"  size="${event.address.length}" value="${event.address}" required>
                    </span>
                  </li>
                  <li class="list-group-item">
                    <h4 class='inline-header'>Description:</h4>
                    <span id="${event._id}-desc" class='eventData'>${event.desc}</span>
                    <span id="${event._id}-desc-input-span" class='eventInput'>
                      <textarea id="${event._id}-desc-input" name="desc" cols="10" rows="5" value="${event.desc}" required></textarea>
                    </span>
                  </li>

                </ul>
              </div>
            </div>
            <!-- end of event internal row -->
            <div class='panel-footer'>
              <button class='btn btn-primary del-event'>Delete Event</button>
              <button class='btn btn-primary edit-event'>Edit Event</button>
              <button class='btn btn-primary save-event'>Save Changes</button>
            </div>
          </div>
        </div>
      </div>
      </form>
    </div>

    <!-- end one event -->
  `);
  $('#eventsContainer').append(eventHtml);
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

function handleError(err){
  console.log(err);
}
