	Blockly.Blocks['mqtt_connector_begin'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("MQTTconnector");
			this.appendValueInput("NAME")
				.setCheck("String")
				.appendField("Device name:");
			this.appendValueInput("HOST")
				.setCheck("String")
				.appendField("Host name: ");
			this.appendValueInput("USERNAME")
				.setCheck("String")
				.appendField("Username:");
			this.appendValueInput("PASSWORD")
				.setCheck("String")
				.appendField("Password:");
			this.appendValueInput("CLIENT_ID")
				.setCheck("String")
				.appendField("Client ID:");
			this.appendValueInput("PREFIX")
				.setCheck("String")
				.appendField("Prefix:");
			this.appendValueInput("PUBLISH")
				.setCheck("Number")
				.appendField("PUBLISH every:");
			this.setInputsInline(false);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(65);
			this.setTooltip("CMMC MQTT Connector");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['mqtt_connector_publish'] = {
		init: function () {
			this.appendValueInput("TOPIC")
				.setCheck("String")
				.appendField("on MQTT publish")
				.appendField("Topic name:");
			this.appendValueInput("MSG")
				.appendField("Data:");
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(65);
			this.setTooltip("mqtt_connector_publish");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['mqtt_connector_send_command'] = {
		init: function () {
			this.appendValueInput("TOPIC")
				.setCheck("String")
				.appendField("on MQTT send Command")
				.appendField("Topic:");
			this.appendValueInput("MSG")
				.appendField("Message:");
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(65);
			this.setTooltip("mqtt_connector_send_command");
			this.setHelpUrl("");
		}
	};


	Blockly.Blocks['mqtt_connector_receive'] = {
		init: function () {
			Blockly.BlockSvg.START_HAT = true;
			this.appendValueInput("TOPIC")
				.setCheck("String")
				.appendField("on MQTT recieve")
				.appendField("Topic:");
			this.appendValueInput("MSG")
				.setCheck("String")
				.appendField("Message:");
			this.appendStatementInput("DO")
				.setCheck(null);
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(65);
			this.setTooltip("mqtt_connector_receive");
			this.setHelpUrl("");
		}
	};
