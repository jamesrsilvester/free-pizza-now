console.log('JS is Linked');

$(document).ready(function() {
  //renderEvents(sampleEvents);
  /* TODO: If you are going to use ES6, use it completely across the app (i.e. arrow functions) */
  let modalEventForm = $('#modalEventForm');
  let closeModal = $('#closeModal');
  /* TODO: If you are abstracting selectors to variables, why are you stopping only at these two?
    Consider assigning them to all selectors for consistency */
  let currPage = 'Home';
  let numArticles = 0;
  loadHome();

  //nav
  /* TODO: to make your document ready section smaller, consider naming your callback functions and defining them outside of this scope. This makes your code that much more semantic. */
  $('#navHome').on('click', function(e) {
    e.preventDefault();
    // TODO: what is the of point of this if statement if no matter what currPage will be set to 'Home'?
    if (currPage !== 'Home') {
      currPage = 'Home';
      loadHome();
    }
  });

  /* TODO: to make your document ready section smaller, consider naming your callback functions and defining them outside of this scope. This makes your code that much more semantic. */
  $('#navAbout').on('click', function(e) {
    e.preventDefault();
    // TODO: what is the of point of this if statement if no matter what currPage will be set to 'About'?
    if (currPage !== 'About') {
      currPage = 'About';
      loadAbout();
    }
  });

  /* TODO: to make your document ready section smaller, consider naming your callback functions and defining them outside of this scope. This makes your code that much more semantic. */
  $('#navSignUp').on('click', function(e) {
    e.preventDefault();
    // TODO: what is the of point of this if statement if no matter what currPage will be set to 'Singup'?
    if (currPage !== 'SignUp') {
      currPage = 'SignUp';
      loadSignUp();
    }
  });

  // Add Event Button Clicked
  /* TODO: to make your document ready section smaller, consider naming your callback functions and defining them outside of this scope. This makes your code that much more semantic. */
  $('#eventAdd').on('click', function(e) {
    $('#saveEvent').html('Add Event');
    $('#modalH4').html('Create Event');
    $('#eventsModal').modal();
  });

  /* TODO: to make your document ready section smaller, consider naming your callback functions and defining them outside of this scope. This makes your code that much more semantic. */
  $('#navEventBrite').on('click', function(e) {
    event.preventDefault();
    getEventBriteEvents();
  });

  //Save New Event
  /* TODO: to make your document ready section smaller, consider naming your callback functions and defining them outside of this scope. This makes your code that much more semantic. */
  modalEventForm.on('submit', function(e) {
    e.preventDefault();

    let eventId = $('#modalEventId').val();
    let formData = $(this).serialize();
    // TODO: Remove console logging from production versions of codebase
    console.log($('#modalEventId').val());
    //put request if an id is present
    // TODO: the number 0 (eventId) is a truthy value, therefore the PUT ajax call will always execute :(
    if (eventId) {
      $.ajax({
        method: 'PUT',
        url: `/api/events/${eventId}`,
        data: formData,
        success: updateEventSuccess,
        error: handleError,
      });
    } else {
      //POST to node
      /* TODO: to make your document ready section smaller, consider naming your callback functions and defining them outside of this scope. This makes your code that much more semantic. */
      /* TODO: consider adding an error handler for this post request as well. */
      $.post('/api/events', formData, function(event) {
        // TODO: Remove console logging from production versions of codebase
        console.log(event);
        renderEvent(event); //render the server's response
        resetEventForm();
      });
    }
  });
  /* TODO: to make your document ready section smaller, consider naming your callback functions and defining them outside of this scope. This makes your code that much more semantic. */
  $('#contentContainer').on('click', '.edit-event', function(e) {
    e.preventDefault();
    /* TODO: insetead of creating 7 separate variables, consider creating an object literal called selectorId that would contain all the attributes you assigned. */
    let id = $(this).closest('.event').data('event-id'),
      selectorId = `#${id}`,
      selectorIdEventName = `${selectorId}-name`,
      selectorIdEventDateAndTime = `${selectorId}-dateAndTime`,
      selectorIdEventVenue = `${selectorId}-venue`,
      selectorIdEventAddress = `${selectorId}-address`,
      selectorIdEventDesc = `${selectorId}-desc`,
      selectorIdEventImage = `${selectorId}-image`;

    $('#modalEventId').val(id);
    $('#modalEventForm input[name=name]').val(
      $(selectorIdEventName).attr('data-select'),
    );
    $('#description').val($(selectorIdEventDesc).html());
    $('#modalEventForm input[name=dateAndTime]').val(
      $(selectorIdEventDateAndTime).attr('data-select'),
    );
    $('#modalEventForm input[name=venue').val(
      $(selectorIdEventVenue).attr('data-select'),
    );
    $('#modalEventForm input[name=address]').val(
      $(selectorIdEventAddress).attr('data-select'),
    );
    $('#modalEventForm input[name=image]').val(
      $(selectorIdEventImage).attr('src'),
    );
    $('#saveEvent').html('Save Event');
    $('#modalH4').html('Edit Event');
    $('#eventsModal').modal();
  });

  /* TODO: to make your document ready section smaller, consider naming your callback functions and defining them outside of this scope. This makes your code that much more semantic. */
  $('#contentContainer').on('click', '.del-event', function(e) {
    e.preventDefault();
    let id = $(this).closest('.event').data('event-id');
    handleDeleteEventClick(id);
  });

  // TODO: In production codebase emove unused or commented out code or leave a comment why it is commented out
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

  /* TODO: to make your document ready section smaller, consider naming your callback functions and defining them outside of this scope. This makes your code that much more semantic. */
  /* TODO: Isn't #closmodal set to a variable up above? */
  $('#closeModal').on('click', function(e) {
    //no prevent default - want to keep
    //default form reset behavior w/o passing form ID
    $('#eventsModal').modal('hide');
  });
}); /* END OF DOCUMENT READY */
// $("#addEvent").on("click")

function loadHome() {
  /* TODO: could you simply place 'Events' as an argument to setPageHeader? */
  /* TODO: why are you using backticks for this string? */
  let pageHeaderContent = `Events`;
  setPageHeader(pageHeaderContent);

  //all events
  /* TODO: why are you using backticks for this string? */
  let contentHeaderContent = `<button id="eventAdd" class="btn btn-primary">Add Event</button>`;
  setContentHeader(contentHeaderContent);

  $.ajax({
    method: 'GET',
    url: '/api/events',
    success: handleSuccessGet,
    error: handleError,
  });
}

function loadAbout() {
  /* TODO: could you simply place 'About' as an argument to setPageHeader? */
  let pageHeaderContent = `About`;
  setPageHeader(pageHeaderContent);
  setContentHeader();

  /* TODO: Could this be actual html on your page that has a hidden class instead of existing in your javascript? */
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

function loadSignUp() {
  /* TODO: why are you using backticks for this string? */
  let pageHeaderContent = `Sign Up for FREE PIZZA!!!!!`;
  setPageHeader(pageHeaderContent);
  setContentHeader();

  let contentContainerContent = `  <div class="col-md-4 greyBack">
  <span class="imgCaption"><img src="../images/reg_form.png"  class="regImage"></span></div>
<div class="col-md-4 greyBack"><span class="imgCaption"><img src="../images/IMG_3953.jpg" class="regImage"><br /> James Silvester & Some Random Dude</span>
  </div>`;

  setContent(contentContainerContent);
}

/*   TODO: You can set default values in parameters if you are using es6:
  function setPageHeader(pageHeaderContent = '') {
    ...
  }
*/
function setPageHeader(pageHeaderContent) {
  if (!pageHeaderContent) {
    pageHeaderContent = '';
  }

  $('#pageHeader').empty().html(pageHeaderContent);
}

/*   TODO: You can set default values in parameters if you are using es6:
  function setPageHeader(contentHeaderContent = '') {
    ...
  }
*/
function setContentHeader(contentHeaderContent) {
  if (!contentHeaderContent) {
    contentHeaderContent = '';
  }
  $('#contentHeader').empty().html(contentHeaderContent);
}

/*   TODO: You can set default values in parameters if you are using es6:
  function setPageHeader(content = '') {
    ...
  }
*/
function setContent(content) {
  if (!content) {
    content = '';
  }
  $('#contentContainer').empty().html(content);
}

function appendContent(content) {
  if (content) {
    $('#contentContainer').append(content);
  }
}

function resetEventForm() {
  /* TODO: isn't this selector extracted to a variable? */
  $('#closeModal').trigger('click');
}

function formatDateAndTime(dateAndTime) {
  return `<strong>${dateAndTime}</strong>`;
}

function formatVenue(venue) {
  return `<strong><a href="#">${venue}</a></strong>`;
}

function formatAddress(address) {
  return `${address} <a href="#">(map)</a>`;
}

function formatName(name) {
  let formattedName = name.substring(0, 51);
  if (name.length > 50) {
    // TODO: shorthand alternative: formattedName += '...'
    formattedName = formattedName + '...';
  }
  return formattedName;
}

function renderEvent(event) {
  let formattedDateAndTime = formatDateAndTime(event.dateAndTime);
  let formattedVenue = formatVenue(event.venue.name);
  let formattedAddress = formatAddress(event.venue.address);
  let formattedName = formatName(event.name);
  let eventHtml = `<div class="event col-lg-4 col-md-4 col-xs-12 col-sm-6 " id="${event._id}" data-event-id="${event._id}">
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
          <div id="${event._id}-venue" data-select="${event.venue
    .name}" class='eventData'>${formattedVenue}</div>
          <div id="${event._id}-address" data-select="${event.venue
    .address}" class='eventData'>${formattedAddress}</div>
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
}

function renderEvents(eventsList) {
  eventsList.forEach(function(item, index) {
    renderEvent(item);
  });
}

function handleSuccessGet(eventsList) {
  setContent();
  renderEvents(eventsList);
}

function updateEventSuccess(event) {
  // TODO: Consider putting all of these variables into an object literal for organization
  let selectorId = `#${event._id}`,
    selectorName = `${selectorId}-name`,
    selectorVenue = `${selectorId}-venue`,
    selectorAddress = `${selectorId}-address`,
    selectorDateAndTime = `${selectorId}-dateAndTime`,
    d;
  (selectorDesc = `${selectorId}-desc`), (selectorImage = `${selectorId}-image`);

  // TODO: Could you also include dading the data-select attributes to each format function call? This would reduce the amount of lines here.
  $(selectorName).html(formatName(event.name));
  $(selectorName).attr('data-select', event.name);
  $(selectorVenue).html(formatVenue(event.venue.name));
  $(selectorVenue).attr('data-select', event.venue.name);
  $(selectorDateAndTime).html(formatDateAndTime(event.dateAndTime));
  $(selectorDateAndTime).attr('data-select', event.dateAndTime);
  $(selectorAddress).html(formatAddress(event.venue.address));
  $(selectorAddress).attr('data-select', event.venue.address);
  $(selectorDesc).html(event.description);
  $(selectorImage).attr('src', event.image);
  resetEventForm();
}

// DELETE EVENT
// when a delete button for an event is clicked
function handleDeleteEventClick(eventId) {
  // TODO: Remove console logging from production versions of codebase
  console.log('someone wants to delete event id=' + eventId);
  $.ajax({
    url: '/api/events/' + eventId,
    method: 'DELETE',
    success: handleDeleteEventSuccess,
    // TODO: What happens if there is an error?
  });
}

// callback after DELETE /api/events/:id
function handleDeleteEventSuccess(event) {
  // TODO: Remove console logging from production versions of codebase
  console.log('removing the following event from the page:', event._id);
  let selectorID = `#${event._id}`;
  $(selectorID).remove();
}

function handleError(err) {
  // TODO: there are three actual arguments for the error return from an ajax; consider revealing all three for more information
  console.log(err);
}

// EVENTS
let eventbriteAPI =
  'https://www.eventbriteapi.com/v3/events/search/?q=pizza+OR+refreshments&sort_by=date&location.within=5mi&location.latitude=37.7902457&location.longitude=-122.40048120000002&price=free&start_date.keyword=this_week&token=QZAGTH35SAKMJ2DFF3DX';

function getEventBriteEvents() {
  let pageHeaderContent = `Import Events`;
  setPageHeader(pageHeaderContent);

  setContentHeader();

  $.ajax({
    method: 'GET',
    url: eventbriteAPI,
    success: eventSuccess,
    error: handleError,
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
    method: 'POST',
    url: '/api/events/eventBrite',
    data: data,
    success: handleSuccessGet,
    error: handleError,
  });
}
