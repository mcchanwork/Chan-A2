var http = require('http');
var server = http.createServer(requestHandler); 
server.listen(process.env.PORT, process.env.IP, startHandler);

function startHandler()
{
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
}

function requestHandler(req, res) 
{
  try
  {
    var url = require('url');
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    
    res.writeHead(200, {'Content-Type': 'application/json'});
    
    if (query['cmd'] == undefined)
      throw Error("A command must be specified");
      
    var result = {};
    if (query['cmd'] == 'CalcCharge')
    {
      result = serviceCharge(query);
    }
    else
    {
      throw Error("Invalid command: " + query['cmd']);
    }
 
    res.write(JSON.stringify(result));
    res.end('');
  }
  catch (e)
  {
    var error = {'error' : e.message};
    res.write(JSON.stringify(error));
    res.end('');
  }
}

function serviceCharge(query)
{
  console.log("Handling a request");
  console.log(query);
  
  //Error checking "checkBal"
  if(isNaN(query['checkBal']))
  {
    throw Error("Invalid value for checkBal");
  }
  else
  {
    if (query['checkBal'] == undefined || query['checkBal']<0)
    throw Error("Invalid value for checkBal");
  }
 //error checking savingBal
  if(isNaN(query['savingsBal']))
  {
    throw Error("Invalid value for savingsBall");
  }
  else
  {
    if(query['savingsBal'] == undefined || query['savingsBal']<0)
    throw Error("Invalid value for savingsBal");
  }
  //Error checking checks
  if(isNaN(query['checks']))
  {
    throw Error("Invalid value for checks");
  }
  else
  {
    if(query['checks'] == undefined || query['checks'] < 0)
    throw Error("Invaldi value for checks")
  }
    
  var charge = 0;
  
  //if statement to check arguement
  if (query['checkBal'] <= 1000 && query['savingsBal'] <= 1500)
  {
    charge = .15;
  }
  //calculate total charge
  var total = charge * parseInt(query['checks']);
    
  var result = {'charge' : total}; 
  return result;
}