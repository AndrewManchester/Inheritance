class Point {
    constructor(row, column) {
      this._row = row
      this._column = column
    }
    dump() {
       return `aPoint ${this._row} ${this._column}` 
    }
    dumpToArray() {
      return [this._row, this._column]
    }
    equal(aPoint) { 
       return (this._row === aPoint._row &&  
               this._column === aPoint._column) ? true : false
    }     
    getRow() { 
       return this._row 
    }   
    getColumn() { 
       return this._column
    } 
}

class Path {
    //expect a list points
    constructor(...points) {
        this._path = points.map(x => x) 
        //Assuming here that map can clone aPoint
        //aPoint is a simple structure
    }
    lastPoint() {
        return this._path[this._path.length-1]
    }    
    addPoint(aPoint) {//push return not as expected
        this._path.push(aPoint)
        return this
    }

   thePoints() {
       return this._path
    }    
    //_dump() {
    //   return this._path
    //}
    dumpToArray() {
       return  this._path.map( aPoint => aPoint.dumpToArray())
    }
    clone() {
       return new Path(...this._path.map(a => a)) 
       //map returns [] use ... to unpack as parameter in call
    }
    justUniquePoints() {
    //Take an array 
    //Starting with first point. Are any other points in the array identical
    //if no move on to check the next point
    //if yes then the path has two identical points
     let points = this.thePoints()  
     let justUnique = true
     for (let i=0; i < points.length; i++) {
         for (let j=0; j < points.length; j++) {
            if (i !== j) {
              if (points[i].equal(points[j]) === true) {
                justUnique = false
                break
             }
          }
       } 
     }
     return justUnique
   }
   pointInPath(aPoint) {
      let inPath = false
      let points = this.thePoints()  
      for (let i=0; i < points.length; i++) {
             if (points[i].equal(aPoint) === true) {
                inPath = true
                break
             }
     }
     return inPath
   }
}
class Queue {
    constructor(aPath) {
      //this.paths = [aPath]
      if (aPath !== null) {
        var x = Object.assign(Object.create(Object.getPrototypeOf(aPath)), aPath)
        this._paths = [x]
      } 
      else {
        this._paths = [] 
      }
    }
    //addPath(aPath) { //push return not as expected
    //  this._paths.push(aPath)
    //  return this
    //}
    addPaths(...aPath) { //so addPaths(p1,p2,p3) becomes [p1,p2,p3]
      aPath.map( singlePath => this._paths.push(singlePath))
      return this
    }
    thePaths() {
      return this._paths
    }
    dumpToArray() {
       return this.thePaths().map( aPath => { 
         return aPath.dumpToArray()
         //return [4,5]
         })
    }     
    dumpToPoints() {
       return this.thePaths().map( aPath => { 
         return aPath.thePoints()
         })
    } 
    removePathsWithDuplicatePoints()  {
      var t = this.thePaths().filter( aPath => { 
         return aPath.justUniquePoints()
       })
     
      this._paths = []
      for (let i=0; i < t.length; i++) {
         this.addPaths( t[i])
       }
       return this
    }
}

module.exports =  { Point, Path, Queue }
