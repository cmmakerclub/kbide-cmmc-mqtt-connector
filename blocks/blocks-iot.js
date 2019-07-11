Blockly.Blocks['mqtt_connector_begin'] = {
	init: function () {
		this.appendDummyInput()
			.appendField("MQTTConnector");
		this.appendDummyInput()
			.appendField("Device name:")
			.appendField(new Blockly.FieldTextInput("KB-001"), "NAME");
		this.appendDummyInput()
			.appendField("Host name: ")
			.appendField(new Blockly.FieldTextInput("mqtt.cmmc.io"), "HOST");
		this.appendDummyInput()
			.appendField("User name: ")
			.appendField(new Blockly.FieldTextInput(""), "USERNAME");
		this.appendDummyInput()
			.appendField("Password: ")
			.appendField(new Blockly.FieldTextInput(""), "PASSWORD");
		this.appendDummyInput()
			.appendField("Client ID: ")
			.appendField(new Blockly.FieldTextInput(""), "CLIENT_ID");
		this.appendDummyInput()
			.appendField("Prefix: ")
			.appendField(new Blockly.FieldTextInput("KBIDE/"), "PREFIX");
		this.appendDummyInput()
			.appendField("PUBLISH every: ")
			.appendField(new Blockly.FieldTextInput("10"), "PUBLISH");
		this.setInputsInline(false);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(65);
		this.setTooltip("CMMC MQTT Connector");
		this.setHelpUrl("www.kbide.org");
	}
};

Blockly.Blocks['mqtt_connector_publish'] = {
	init: function () {
		this.appendDummyInput()
			.appendField("on MQTT publish");
		this.appendValueInput("MSG1")
			.appendField("data 1:")
			.appendField(new Blockly.FieldTextInput("temp"), "DATA1")
			.appendField("value:");
		this.appendValueInput("MSG2")
			.appendField("data 2:")
			.appendField(new Blockly.FieldTextInput("humid"), "DATA2")
			.appendField("value:");
		this.appendValueInput("MSG3")
			.appendField("data 3:")
			.appendField(new Blockly.FieldTextInput("count"), "DATA3")
			.appendField("value:");
		this.setInputsInline(false);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(65);
		this.setTooltip("mqtt_connector_publish");
		this.setHelpUrl("www.kbide.org");
	}
};

	// Blockly.Blocks['mqtt_connector_send_command'] = {
	// 	init: function () {
	// 		this.appendValueInput("TOPIC")
	// 			.setCheck("String")
	// 			.appendField("on MQTT send Command")
	// 			.appendField("Topic:");
	// 		this.appendValueInput("MSG")
	// 			.appendField("Message:");
	// 		this.setInputsInline(true);
	// 		this.setPreviousStatement(true, null);
	// 		this.setNextStatement(true, null);
	// 		this.setColour(65);
	// 		this.setTooltip("mqtt_connector_send_command");
	// 		this.setHelpUrl("");
	// 	}
	// };


	// Blockly.Blocks['mqtt_connector_receive'] = {
	// 	init: function () {
	// 		Blockly.BlockSvg.START_HAT = true;
	// 		this.appendValueInput("TOPIC")
	// 			.setCheck("String")
	// 			.appendField("on MQTT recieve")
	// 			.appendField("Topic:");
	// 		this.appendValueInput("MSG")
	// 			.setCheck("String")
	// 			.appendField("Message:");
	// 		this.appendStatementInput("DO")
	// 			.setCheck(null);
	// 		this.setInputsInline(true);
	// 		this.setPreviousStatement(true, null);
	// 		this.setNextStatement(true, null);
	// 		this.setColour(65);
	// 		this.setTooltip("mqtt_connector_receive");
	// 		this.setHelpUrl("");
	// 	}
	// };
