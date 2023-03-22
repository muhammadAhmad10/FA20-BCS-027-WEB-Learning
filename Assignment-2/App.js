

$(function(){
    $("#add-recipie").on('click',addRecipie)
    $('#show-recipie').on('click',showRecipies)
    $(this,'#delete').on('click',deleteRecipie)
    // $('#edit').on('click',editRecipie)
})

//Adding new recipie to the api as well as table
function addRecipie(){
    t = $('#recipie-title').val()
    b = $('#recipie-body').val()
    const id = Math.random()*10000000000;

    const recipie = {
        _id: id,
        title:t,
        body:b,
        __v:0
    }
    $.ajax({
        url: "https://usman-fake-api.herokuapp.com/api/recipes",
        method:'POST',
        data:recipie,
        success: postRecipie(recipie),
        error: function(){console.log('could not post recepies')}
    })
}
function postRecipie(recipie){
    $('#table-body').append(`<tr><td>${recipie.title}</td><td>${recipie.body}</td><td>${recipie._id}</td>              
        <td><button class="btn btn-danger me-3"><i class="fa fa-remove"></i></button><button class="btn btn-warning"><i class="fa fa-pencil"></i></button></td>
    </tr>`)
    $('#exampleModal').modal('hide')
}



//Showing recipies from the api to the table
function showRecipies(){
    $.ajax({
        url: "https://usman-fake-api.herokuapp.com/api/recipes",
        method:'GET',
        success: showRecipiesInTable,
        error: function(){console.log('could not get recepies')}
    })
}

function showRecipiesInTable(response){
    for(let x =0;x<=response.length;x++){
        $('#table-body').append(`<tr><td>${response[x].title}</td><td>${response[x].body}</td><td>${response[x]._id}</td>              
            <td><button class="btn btn-danger me-3"><i class="fa fa-remove"></i></button><button class="btn btn-warning"><i class="fa fa-pencil"></i></button></td>
        </tr>`)
    }
}



//deleting the recipie from the table as well as api
function deleteRecipie(){
    console.log('into deleteRecipie')
    deletingRecipie()
    // $.ajax({
    //     url:"https://usman-fake-api.herokuapp.com/api/recipes",
    //     method:'DELETE',
    //     success:deletingRecipie,
    //     error:function(){console.log('Unable to delete recipie.')}
    // })
}

function deletingRecipie(){
    console.log('deleting')
    // let row = $(this).closest('tr');
    // row.remove()
    $(this).closest('tr').remove();
    // $('#table-body').remove('tr')
    console.log('passed')
}