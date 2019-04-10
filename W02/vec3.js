// Constructor
Vec3 = function(x,y,z)
{
	this.x = x;
	this.y = y;
	this.z = z;
}

// Add method
Vec3.prototype.add = function(v)
{
	this.x += v.x;
	this.y += v.y;
	this.z += v.z;
	return this;
}

// Sum method
Vec3.prototype.sum = function()
{
	return this.x + this.y + this.z;
}

// Min method
Vec3.prototype.min = function()
{
	var xdn = this.sort();
	var min = xdn[2];
	return min;
}

// Mid method
Vec3.prototype.mid = function()
{       
        var xdn = this.sort();
        var mid = xdn[1];
        return mid;
}

// Max method
Vec3.prototype.max = function()
{       
        var xdn = this.sort();
        var max = xdn[0];
        return max;
}

// Sort method
Vec3.prototype.sort = function()
{
	if(this.x >= this.y)
	{
		if(this.x >= this.z)
		{
			if(this.y >= this.z)
			{
				var xdn = [this.x, this.y, this.z];
			}
			else
			{
				var xdn = [this.x, this.z, this.y];
			}
		}
		else
		{
			var xdn = [this.z, this.x, this.y];
		}
	}
	else
	{
		if(this.y >= this.z)
		{
			if(this.x>=this.z)
			{
				var xdn = [this.y, this.x, this.z];
			}
			else
			{
				var xdn = [this.y, this.z, this.x];
			}
		}
		else
		{
			var xdn = [this.z, this.y, this.x];
		}
	}
	return xdn;
}

