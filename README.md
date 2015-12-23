# Zabbix Dash
A Simple Zabbix API Dashboard

# Requirements
There are no requirements to run this dashboard. Only a web server like apache. Then you can access your or any Zabbix Server by the Zabbix API.

## Tested Zabbix API versions
- 2.4.6
- Should work with all newer zabbix version

# Install
To use this dashboard, clone the repository and upload the files to a web server. That's all and should work. Now you can log in your Zabbix by typing the user name, password, and Zabbix url in the login form.

# Screenshots
![Zabbix Dash Login](https://raw.githubusercontent.com/PetzJohannes/zabbix-dash/master/images/zabbix-dash-login.png)

# Features
## Login
- With Zabbix account
- Store Zabbix auth to remember session
- Several error handlings and messages
- Validate Zabbix API Version

## Trigger
- Display active triggers
- Search trigger by description
- Sort triggers by date, trigger description, priority (ASC and DESC)
- Display acknowlegde state
- Acknowlegde last event
- Count the events for one trigger and display it in acknowledge menu

## Hosts
- Display an overview about all hosts like in Zabbix Frontend

## Dashboard
- Count trigger of all prioritys in grid system

# Roadmap
- Hosts overview
- Item overview
- Display discovered networks
- Filter discovered networks (search not registered Zabbix hosts)
- Create new host / add interface to host from discovery view
- User menu to display my data
- Resolve macros in the trigger event overview
- Autorefresh on dashboard
- Show last events in acknowledge modal
- Show count of acknowledge messages in acknowledge modal
- Show last acknowledge messages in acknowledge modal
- Display discovery rules and filter by known and unknown hosts
- New view for item data with graphs and history
- Date picker in menu to select a time from and till
- New view for events
- Last 20 triggers as dashboard overview

# Bugs
- Trigger date month false return value
- Host overview is not working yet

# Risk
Use this dashboard at your own risk! I will test each function, bugs are not excluded.
