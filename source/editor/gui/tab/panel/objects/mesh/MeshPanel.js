"use strict";

function MeshPanel(parent, obj)
{
	DrawablePanel.call(this, parent, obj);

	this.geometry = GeometryForm.create(this.form, this.obj);
}

MeshPanel.prototype = Object.create(DrawablePanel.prototype);

MeshPanel.prototype.updatePanel = function()
{
	DrawablePanel.prototype.updatePanel.call(this);
	
	if(this.geometry !== null)
	{
		try
		{
			this.geometry.updateValues();
		}
		catch(e)
		{
			this.geometry.destroy();
			this.geometry = GeometryForm.create(this.form, this.obj);
		}
	}
};
