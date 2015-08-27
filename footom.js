var opts = [
  {
    params: ["foo", "bob", "jim"],
    opt: {
      req: 'GET',
      path: '/foo/do'
  	}
  },
  {
    params: ["kramer", "smelly", "yadda"],
    opt: {
      req: 'POST',
      path: '/stuff/blah'
    }
  }
];

function start() {
	while ( i = opts.shift() ) {
    	makeReq(i);
    }
}

function makeReq(oppt) {
	while (  i = oppt['params'].shift() ) {
//     	request(oppt['opt'], i);
      console.log("do " + oppt.opt.req + " request to " + oppt.opt.path + " with params: " + i);
    }
}

start();
