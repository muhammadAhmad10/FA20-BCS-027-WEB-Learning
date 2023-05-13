$(function(){
    $('#j').append(`<button class="btn btn-danger m-3" id="sort">Sort List A</button>`);
    $('#j').append(`<button class="btn btn-danger m-3" id="sort1">Sort List B</button>`);
    $('#j').append(`<button class="btn btn-danger m-3" id="bg">Change Background</button>`);

    $('#sort').click(function(){

        var apList = $('#A #AP');
        
        apList.sort(function(a, b) {
            var aText = $(a).text();
            var bText = $(b).text();
            return aText.localeCompare(bText);
        });
        $('#A').empty().append(apList);
    });
    $('#sort1').click(function(){

        var apList = $('#B #BP');
        
        apList.sort(function(a, b) {
            var aText = $(a).text();
            var bText = $(b).text();
            return aText.localeCompare(bText);
        });
        $('#B').empty().append(apList);
    });

    $('#A').on('click', '#AP', function() {
        $(this).appendTo('#B');
    });

    $('#B').on('click','#BP',function(){
        $(this).appendTo('#A')
    })

    $('#bg').click(function(){
        $('#j').css('background-color','#0e3564');
        console.log('clicked')
    })

    $('form').submit(function(e){
        e.preventDefault()
        var name = $('#name').val();
        var pass = $('#pass').val();
        if(name === ''){
            $('#name').toggleClass('failure')
        }
        if(pass === ''){
            $('#pass').toggleClass('failure')
        }
        if(name !== ''){
            $('#name').toggleClass('success')
        }
        if(pass !== ''){
            $('#pass').toggleClass('success')
        }

        if(name!=='' && pass!==''){
            
            $('form').prop('action','http://localhost:3000/api/auth/login')
            $('form').prop('method','post')
            $('form').submit()
            alert('form submitted')
        }
    })


    // fetchData()

    $('#d').append('<Button class="btn btn-primary" id="ad">CHange color</Button>')
    $('#ad').on('click',function(){
        $('.box').css('background-color','red')
    })

});


function fetchData(){
    $.ajax({
        url: 'https://usman-fake-api.herokuapp.com/api/recipes',
        method: 'get',
        success: function(response){
            for(var x=0;x<response.length;x++){
                $('#body').append(`<tr id="${response[x]._id}"><td>${response[x]._id}</td>
                    <td>${response[x].body}</td>
                    <td>${response[x].title}</td>
                    <td><button onClick="editData('${response[x]._id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModalUpdate"">Edit</button>
                        <button onClick="deleteData('${response[x]._id}')" class="btn btn-danger">Delete</button></td>
                </tr>`)
            }
        },
        error: function(error){
            console.log(error)
        }
    })
}


function deleteData(id){
    console.log('deleting data')
    console.log(id)
    $.ajax({
        url: `https://usman-fake-api.herokuapp.com/api/recipes/${id}`,
        method: 'delete',
        success: function(){

            console.log('deleting row')
            $(`#${id}`).remove();
            console.log('row deleted')
        },
        error: function(error){
            console.log(error)
        }
    })
}

function editData(id){
    console.log('editing data')
    $.ajax({
        url: `https://usman-fake-api.herokuapp.com/api/recipes/${id}`,
        method:'put',
        data:{}
    })
}



