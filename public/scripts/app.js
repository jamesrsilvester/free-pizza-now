console.log("JS is Linked");


$(document).ready(function() {
  / this function takes a single album and renders it to the page
  function renderAlbum(album) {
    console.log('rendering album', album);


    let albumHtml = (`
      <div class="row album" id="${album._id}" data-album-id="${album._id}">
      <form id="${album._id}-update" action="#" onsubmit="return false" method="PUT" class="album-update-form" name="${album._id}-update">
        <div class="col-md-10 col-md-offset-1">
          <div class="panel panel-default">
            <div class="panel-body">
            <!-- begin album internal row -->
              <div class='row'>
                <div class="col-md-3 col-xs-12 thumbnail album-art">
                  <img src="images/800x800.png" alt="album image">
                </div>
                <div class="col-md-9 col-xs-12">
                  <ul class="list-group">
                    <li class="list-group-item">
                      <h4 class='inline-header'>Album Name:</h4>
                      <span id="${album._id}-name" class='albumData'>${album.name}</span>
                      <span id="${album._id}-name-input-span" class='albumInput'>
                        <input id="${album._id}-name-input" type="text" name="name" value="${album.name}" size="${album.name.length}" required>
                      </span>
                    </li>
                    <li class="list-group-item">
                      <h4 class='inline-header'>Artist Name:</h4>
                      <span id="${album._id}-artistName" class='albumData'>${album.artistName}</span>
                      <span id="${album._id}-artistName-input-span" class='albumInput'>
                        <input id="${album._id}-artistName-input" type="text" name="artistName" size="${album.artistName.length}" value="${album.artistName}" required>
                      </span>
                    </li>
                    <li class="list-group-item">
                      <h4 class='inline-header'>Released date:</h4>
                      <span id="${album._id}-releaseDate" class='albumData'>${album.releaseDate}</span>
                      <span id="${album._id}-releaseDate-input-span" class='albumInput'>
                        <input id="${album._id}-releaseDate-input" type="text" name="releaseDate"  size="${album.releaseDate.length}" value="${album.releaseDate}" required>
                      </span>
                    </li>
                    <li class="list-group-item">
                      <h4 class="inline-header">Songs:</h4>
                      <span id="${album._id}-songs"></span>
                    </li>
                  </ul>
                </div>
              </div>
              <!-- end of album internal row -->
              <div class='panel-footer'>
                <button class='btn btn-primary add-song'>Add Song</button>
                <button class='btn btn-primary del-album'>Delete Album</button>
                <button class='btn btn-primary edit-album'>Edit Album</button>
                <button class='btn btn-primary save-album'>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
        </form>
      </div>

      <!-- end one album -->
    `);
    $('#albums').append(albumHtml);
    renderSongs(album);
  };

}
