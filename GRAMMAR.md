match => "match" ":"
match_action+
sequence => "sequence" sequence_identifier ":"
match_action+
match_action => (sequence_identifier | performed_action)
performed_action => actor_group "." action ("=>" reaction)?
reaction => actor_group "." action | actor_group
actor_group => actor | actor "," (actor_group)+
action => "action" action_identifier
actor => "actor" actor_identifier
sequence_identifier => IDENTIFIER
actor_identifier = IDENTIFIER
