# Zabbix Dash
A Simple Zabbix API Dashboard

# Requirements
There are no requirements to run this dashboard. Only a web server like apache. Then you can access your or any Zabbix Server by the Zabbix API.

## Tested Zabbix versions
- 2.4.6

# Install
To use this dashboard, clone the repository and upload the files to a web server. That's all and should work. Now you can log in your Zabbix by typing the user name, password, and Zabbix link in the login form.

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

## Hosts
- Display an overview about all hosts like in Zabbix Frontend

## Dashboard
- Count trigger of all prioritys

# Roadmap
- Acknowlegde (trigger) events
- Hosts overview
- Item overview
- Display discovered networks
- Filter discovered networks (search not registered Zabbix hosts)
- Create new host / add interface to host from discovery view
- User menu to display my data
- Resolve macros in the trigger event overview
- Autorefresh on dashboard

# Bugs
- Trigger date month false return value

# Risk
Use this dashboard at your own risk! I will test each function, bugs are not excluded.
