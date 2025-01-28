```
match => "match" ":"
    performed_action+
performed_action => actor_group "." action ("=>" reaction)?
reaction => actor_group "." action | actor_group
actor_group => actor | actor "," (actor_group)+
action => "action" action_identifier
actor => "actor" actor_identifier
actor_identifier = STRING
action_identifier = STRING
```
