var getNextPrime = function(n) {
    if ( n < 8 ) {
      if ( n == 2 || n == 3 || n == 7) return n
    }

    if (n%2 == 0 ||
        n%3 == 0 ||
        //n%4 == 0 ||
        n%5 == 0 ||
        //n%6 == 0 ||
        n%7 == 0 ||
        //n%8 == 0 ||
        n%9 == 0
        )
      return getNextPrime(n+1)
    return n
}

var isPrime = function(n) {
  var l = n - 10
  var m = n + 10
  var p = getNextPrime(l)
  while (n != p && p < m)
    p = getNextPrime(p+1)
  return p == n
}
var why = function (n) {
  var str = ""
  if (n % 2 == 0)
    str = ", Because " + n + " is even."
  else if (n % 3)
    str = ", Because " + n + " is divisible by 3."
  else if (n % 7)
    str = ", Because " + n + " is divisible by 7."
  else if (n % 9)
    str = ", Because " + n + " is divisible by 9."

  document.getElementById('result-div').innerHTML += str
}
var checkIsPrime = function () {
  var p = isPrime(parseInt(document.getElementById('is-prime').value))
  document.getElementById('result-div').innerHTML = p == true ? 'YES' : 'NO <a href="javascript:why('+ document.getElementById('is-prime').value +')"  >Why?</a>';
}

var generateTable = function(start, end, row_size) {

  var row_counter = 1
  var row_size    = row_size || 20

  var starting_prime          = start || 0
  var ending_prime           = end || st + 100

  if (starting_prime >= ending_prime) {
    st          = 0
    n           = 100
  }

  var ending_with = []
  var a = 1
  var b = 0
  var data_interval = 5
  var data_splits = []
  var diff   = function (a, b) {
    return b - a
  }
  var st = "<table class='table'>"
  var trail_of_primes = []
  for (var i = getNextPrime(starting_prime); i < ending_prime; i = getNextPrime(++i)) {
    if (row_counter == 1) {
      st += "<tr>"
    }
    ending_with[i%10] = ++ending_with[i%10] || 1

    if (diff(a, b) > data_interval) {
      var tmp = JSON.stringify(ending_with)
      tmp = JSON.parse(tmp)
      //tmp.unshift(a+"-"+b)
      tmp.unshift(trail_of_primes.join(','))
      data_splits.push(JSON.stringify(tmp))
      a = b
      trail_of_primes = []
    }

    st += "<td>" + i + "</td>"

    if (row_counter == row_size) {
      st += "</tr>"
      row_counter=0
    }
    row_counter++
    b = i
    trail_of_primes.push(i)
  }
  st += '</table>'

  stats = "<table class='stats table'><tr><td class='wide-range'>Range</td>"
  for (var j = 0; j < 10; j++) {
    if (ending_with[j] == 0 || typeof(ending_with[j]) === 'undefined') continue
    stats += '<td>' + j +'</td>'
  }
  stats += "<td >Count</td><td>Diff (Delta)</td></tr>"
  var last_sum = 0
  var sum      = 0

  for (var k = 0; k < data_splits.length ; k++) {
    sum = 0
    stats += "<tr>"
    var data_chunk = JSON.parse(data_splits[k])
    stats += "<td class='wide-range'>" + data_chunk.shift() + "</td>"
    for (var j = 0; j < 10; j++) {
      //if (!(j%2) || j == 5) continue
      if (data_chunk[j] == null || data_chunk[j] == 0 || typeof(data_chunk[j]) === 'undefined') continue
      stats += "<td class='stat-block'><i>" + (data_chunk[j] || 0) + "</i></td>"
      sum += data_chunk[j]
    }
    stats += "<td>"+sum+"</td>"
    stats += "<td>"+(sum-last_sum)+"</td>"
    stats += "</tr>"
    last_sum = sum
  }

  stats += "</table>"

  st = stats + st

  return st
}
