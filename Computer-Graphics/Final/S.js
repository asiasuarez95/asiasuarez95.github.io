
/*
   Here are the old way of defining S (commented out)
   followed by the better way of defining S, so you can
   compare and contrast them.
*/

// --------------------- OLD WAY -----------------------
// There is no way to hide inner functions or variables.

/*
var S = {};

   S._quad = function(f, u0, v0, u1, v1) {
      var q = [];
      q.push(f(u0, v0));
      q.push(f(u1, v0));
      q.push(f(u1, v1));
      q.push(f(u0, v1));
      q.push(f(u0, v0));
      return q;
   }

   S.parametricMesh = function(f, nu, nv) {
      var i, j, u, v, C = [];
      for (j = 0 ; j < nv ; j++) {
         v = j / nv;
         for (i = 0 ; i < nu ; i++) {
            u = i / nu;
	    C.push(S._quad(f, u, v, u + 1/nu, v + 1/nv));
         }
      }
      return C;
   }

   S.sphere = function(u, v) {
      var theta = 2 * Math.PI * u;
      var phi = Math.PI * (v - .5);
      return [ Math.cos(theta) * Math.cos(phi),
               Math.sin(theta) * Math.cos(phi),
                                 Math.sin(phi) ];
   }

   S.tube = function(u, v) {
      var theta = 2 * Math.PI * u;
      return [ Math.cos(theta),
               Math.sin(theta),
	       2 * v - 1 ];
   }
*/

// ---------------- BETTER WAY -----------------
// S is a single instance of an anonymous class.

var S = (function() {               
   var my = {};

   function quad(f, u0, v0, u1, v1) { // Local to this class.
      var q = [];
      q.push(f(u0, v0));
      q.push(f(u1, v0));
      q.push(f(u1, v1));
      q.push(f(u0, v1));
      q.push(f(u0, v0));
      return q;
   }


    my.parametricMesh = function(f, nu, nv) {
      var i, j, u, v, n, C = [];
     var tri = [];
      for (j = 0 ; j < nv ; j++) {
         v = j / nv;
         for (i = 0 ; i < nu ; i++) {
            u = i / nu;
         C.push(quad(f, u, v, u + 1/nu, v + 1/nv));
         }
      }
     for(i=0; i<C.length; i++){
        // calculate the normals
        n = normal(C[i]);
        // triangle 1 of quad
        tri.push(C[i][0][0])
        tri.push(C[i][0][1])
        tri.push(C[i][0][2])
        tri.push(n[0][0]);
        tri.push(n[0][1]);
        tri.push(n[0][2]);
        tri.push(C[i][1][0])
        tri.push(C[i][1][1])
        tri.push(C[i][1][2])
        tri.push(n[1][0]);
        tri.push(n[1][1]);
        tri.push(n[1][2]);
        tri.push(C[i][2][0])
        tri.push(C[i][2][1])
        tri.push(C[i][2][2])
        tri.push(n[2][0]);
        tri.push(n[2][1]);
        tri.push(n[2][2]);
        // triangle 2 of quad
        tri.push(C[i][2][0])
        tri.push(C[i][2][1])
        tri.push(C[i][2][2])
        tri.push(n[3][0]);
        tri.push(n[3][1]);
        tri.push(n[3][2]);
        tri.push(C[i][3][0])
        tri.push(C[i][3][1])
        tri.push(C[i][3][2])
        tri.push(n[4][0]);
        tri.push(n[4][1]);
        tri.push(n[4][2]);
        tri.push(C[i][4][0])
        tri.push(C[i][4][1])
        tri.push(C[i][4][2])
        tri.push(n[5][0]);
        tri.push(n[5][1]);
        tri.push(n[5][2]);
     }
      return tri;
   }

   function normal(P){
      var norms = [];
      var vec1 = [P[1][0]-P[0][0], P[1][1]-P[0][1], P[1][2]-P[0][2]];
      var vec2 = [P[2][0]-P[0][0], P[2][1]-P[0][1], P[2][2]-P[0][2]];
      var norm = [(vec1[1]*vec2[2])-(vec1[2]*vec2[1]), (vec1[2]*vec2[0])-(vec1[0]*vec2[2]), (vec1[0]*vec2[1])-(vec1[1]*vec2[0])];
      var length = Math.sqrt((norm[0]*norm[0]) + (norm[1]*norm[1]) + (norm[2]*norm[2]));
      norm[0] = norm[0]/length;
      norm[1] = norm[1]/length;
      norm[2] = norm[2]/length;
      norms.push(norm);
      vec1 = [P[0][0]-P[1][0], P[0][1]-P[1][1], P[0][2]-P[1][2]];
      vec2 = [P[2][0]-P[1][0], P[2][1]-P[1][1], P[2][2]-P[1][2]];
      norm = [(vec1[1]*vec2[2])-(vec1[2]*vec2[1]), (vec1[2]*vec2[0])-(vec1[0]*vec2[2]), (vec1[0]*vec2[1])-(vec1[1]*vec2[0])];
      length = Math.sqrt((norm[0]*norm[0]) + (norm[1]*norm[1]) + (norm[2]*norm[2]));
      norm[0] = norm[0]/-length;
      norm[1] = norm[1]/-length;
      norm[2] = norm[2]/-length;
      norms.push(norm);
      vec1 = [P[0][0]-P[2][0], P[0][1]-P[2][1], P[0][2]-P[2][2]];
      vec2 = [P[1][0]-P[2][0], P[1][1]-P[2][1], P[1][2]-P[2][2]];
      norm = [(vec1[1]*vec2[2])-(vec1[2]*vec2[1]), (vec1[2]*vec2[0])-(vec1[0]*vec2[2]), (vec1[0]*vec2[1])-(vec1[1]*vec2[0])];
      length = Math.sqrt((norm[0]*norm[0]) + (norm[1]*norm[1]) + (norm[2]*norm[2]));
      norm[0] = norm[0]/length;
      norm[1] = norm[1]/length;
      norm[2] = norm[2]/length;
      norms.push(norm);
      
      vec1 = [P[3][0]-P[2][0], P[3][1]-P[2][1], P[3][2]-P[2][2]];
      vec2 = [P[4][0]-P[2][0], P[4][1]-P[2][1], P[4][2]-P[2][2]];
      norm = [(vec1[1]*vec2[2])-(vec1[2]*vec2[1]), (vec1[2]*vec2[0])-(vec1[0]*vec2[2]), (vec1[0]*vec2[1])-(vec1[1]*vec2[0])];
      length = Math.sqrt((norm[0]*norm[0]) + (norm[1]*norm[1]) + (norm[2]*norm[2]));
      norm[0] = norm[0]/length;
      norm[1] = norm[1]/length;
      norm[2] = norm[2]/length;
      norms.push(norm);
      vec1 = [P[2][0]-P[3][0], P[2][1]-P[3][1], P[2][2]-P[3][2]];
      vec2 = [P[4][0]-P[3][0], P[4][1]-P[3][1], P[4][2]-P[3][2]];
      norm = [(vec1[1]*vec2[2])-(vec1[2]*vec2[1]), (vec1[2]*vec2[0])-(vec1[0]*vec2[2]), (vec1[0]*vec2[1])-(vec1[1]*vec2[0])];
      length = Math.sqrt((norm[0]*norm[0]) + (norm[1]*norm[1]) + (norm[2]*norm[2]));
      norm[0] = norm[0]/-length;
      norm[1] = norm[1]/-length;
      norm[2] = norm[2]/-length;
      norms.push(norm);
      vec1 = [P[2][0]-P[4][0], P[2][1]-P[4][1], P[2][2]-P[4][2]];
      vec2 = [P[3][0]-P[4][0], P[3][1]-P[4][1], P[3][2]-P[4][2]];
      norm = [(vec1[1]*vec2[2])-(vec1[2]*vec2[1]), (vec1[2]*vec2[0])-(vec1[0]*vec2[2]), (vec1[0]*vec2[1])-(vec1[1]*vec2[0])];
      length = Math.sqrt((norm[0]*norm[0]) + (norm[1]*norm[1]) + (norm[2]*norm[2]));
      norm[0] = norm[0]/length;
      norm[1] = norm[1]/length;
      norm[2] = norm[2]/length;
      norms.push(norm);
      
      return norms;
   }

   my.sphere = function(u, v) {
      var theta = 2 * Math.PI * u;
      var phi = Math.PI * (v - .5);
      return [ Math.cos(theta) * Math.cos(phi),
               Math.sin(theta) * Math.cos(phi),
                                 Math.sin(phi) ];
   }

   my.tube = function(u, v) {
      var theta = 2 * Math.PI * u;
      return [ Math.cos(theta),
               Math.sin(theta),
	       2 * v - 1 ];
   }
  my.torus = function(u, v) {
     var theta = 2 * Math.PI * u;
     var phi = 2 * Math.PI * v;
     var r = 0.3;
     return [Math.cos(theta) * (1 + r * Math.cos(phi)),
         Math.sin(theta) * (1 + r * Math.cos(phi)),
         r * Math.sin(phi)];
    }
    
   return my;




})();

